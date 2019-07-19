const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000; 

let Todo = require('./models/todo.model'); 
app.use(cors());

app.use(bodyParser.json()); 

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection; connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

todoRoutes.get('/' , (req, res) => {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.post('/delete', (req, res) => {
    let description = req.body.todo_description
    console.log(description)
    Todo.deleteOne({ todo_description: description }, (err) => {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
})

todoRoutes.post('/add', (req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
}); 

app.use('/todos', todoRoutes); 

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});