const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/unsafe_eval', (req, res) => {
    const userInput = req.body.input;
    const result = eval(userInput);
    console.log("Result:", result);
    res.send(`Result: ${result}`);
});

app.post('/unsafe_file_operations', (req, res) => {
    const fileName = req.body.fileName;
    const filePath = path.join(__dirname, fileName);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err);
            res.send(`Error: ${err}`);
        } else {
            console.log("File contents:", data);
            res.send(`File contents: ${data}`);
        }
    });
});

app.post('/unsafe_password_storage', (req, res) => {
    const password = req.body.password;
    fs.appendFile('passwords.txt', password + '\n', (err) => {
        if (err) {
            console.log("Error:", err);
            res.send(`Error: ${err}`);
        } else {
            console.log("Password stored successfully.");
            res.send("Password stored successfully.");
        }
    });
});

app.post('/unsafe_SQL_query', (req, res) => {
    const db = new sqlite3.Database('example.db');
    const username = req.body.username;
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    db.all(query, (err, rows) => {
        if (err) {
            console.log("Error:", err);
            res.send(`Error: ${err}`);
        } else {
            if (rows.length > 0) {
                console.log(`Welcome, ${username}!`);
                res.send(`Welcome, ${username}!`);
            } else {
                console.log("Invalid username.");
                res.send("Invalid username.");
            }
        }
    });
    db.close();
});

app.post('/unsafe_command_injection', (req, res) => {
    const command = req.body.command;
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.log("Error:", err);
            res.send(`Error: ${err}`);
        } else {
            console.log("Command executed successfully.");
            console.log("Output:", stdout);
            res.send(`Command executed successfully.\nOutput: ${stdout}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});