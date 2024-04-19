import express from 'express';
import { basicAuth } from './authMiddleware';
import { Todo, createTodo } from '../todoClient';

const app = express();

// Define a route that uses the basicAuth middleware
app.get('/', basicAuth, (req, res) => {
    res.status(200).json({ message: 'Authorized' });
});

export default app;

const newTodo: Todo = {
    title: 'Finish project',
    description: 'Complete the todo list project on GitHub',
    completed: false,
  };
  
  createTodo(newTodo)
    .then(() => {
      console.log('Todo item created successfully!');
    })
    .catch((error) => {
      console.error('Error creating todo item:', error);
    });