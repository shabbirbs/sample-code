# app/controllers/vulnerable_controller.rb
class VulnerableController < ApplicationController
  def unsafe_eval
    user_input = params[:input]
    result = eval(user_input)
    puts "Result: #{result}"
    render plain: "Result: #{result}"
  end

  def unsafe_file_operations
    file_name = params[:file_name]
    file_path = File.join(Rails.root, file_name)
    file_contents = File.read(file_path)
    puts "File contents: #{file_contents}"
    render plain: "File contents: #{file_contents}"
  end

  def unsafe_password_storage
    password = params[:password]
    File.open('passwords.txt', 'a') do |file|
      file.puts(password)
    end
    puts "Password stored successfully."
    render plain: "Password stored successfully."
  end

  def unsafe_SQL_query
    username = params[:username]
    query = "SELECT * FROM users WHERE username = '#{username}'"
    results = ActiveRecord::Base.connection.execute(query)
    if results.present?
      puts "Welcome, #{username}!"
      render plain: "Welcome, #{username}!"
    else
      puts "Invalid username."
      render plain: "Invalid username."
    end
  end

  def unsafe_command_injection
    command = params[:command]
    output = `#{command}`
    puts "Command executed successfully."
    puts "Output: #{output}"
    render plain: "Command executed successfully.\nOutput: #{output}"
  end
end