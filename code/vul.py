import os
import sqlite3
import subprocess

def unsafe_eval():
    userInput = input("Enter a number: ")
    result = eval(userInput)
    print("Result:", result)

def unsafe_file_operations():
    fileName = input("Enter a file name: ")
    filePath = os.path.join(os.path.dirname(__file__), fileName)
    try:
        with open(filePath, 'r') as file:
            fileContents = file.read()
            print("File contents:", fileContents)
    except Exception as e:
        print("Error:", e)

def unsafe_password_storage():
    password = input("Enter a password: ")
    with open('passwords.txt', 'a') as file:
        file.write(password + '\n')
    print("Password stored successfully.")

def unsafe_SQL_query():
    db = sqlite3.connect('example.db')
    cursor = db.cursor()

    username = input("Enter a username: ")
    query = "SELECT * FROM users WHERE username = '{}'".format(username)
    cursor.execute(query)
    rows = cursor.fetchall()

    if len(rows) > 0:
        print("Welcome, {}!".format(username))
    else:
        print("Invalid username.")

    cursor.close()
    db.close()

def unsafe_command_injection():
    command = input("Enter a command to execute: ")
    try:
        output = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT)
        print("Command executed successfully.")
        print("Output:", output.decode())
    except subprocess.CalledProcessError as e:
        print("Error:", e.output.decode())

def main():
    print("1. Unsafe eval()")
    print("2. Unsafe file operations")
    print("3. Unsafe password storage")
    print("4. Unsafe SQL query")
    print("5. Unsafe command injection")

    choice = input("Enter your choice: ")
    if choice == '1':
        unsafe_eval()
    elif choice == '2':
        unsafe_file_operations()
    elif choice == '3':
        unsafe_password_storage()
    elif choice == '4':
        unsafe_SQL_query()
    elif choice == '5':
        unsafe_command_injection()
    else:
        print("Invalid choice.")

main()