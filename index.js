const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./models/Todo'); 
const app = express();
const PORT = 3000;

// connection string here 
const MONGO_URI = "mongodb+srv://username:password@cluster0.mongodb.net/todoApp";


// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error(' Connection error:', err);
});
app.use(cors()); //It allows your frontend (running on a different port) to talk to the backend
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send(' MongoDB-powered To-Do API is Live');
});

// GET all todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// GET for a single todo
app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID' });
  }
});

// POST for new todo
app.post('/todos', async (req, res) => {
  const newTodo = new Todo({ title: req.body.title });
  await newTodo.save();
  res.status(201).json(newTodo);
});

// PUT to upadate todo
app.put('/todos/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Todo not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID' });
  }
});

// DELETE todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
