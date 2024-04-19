import express from 'express';
import { basicAuth } from './authMiddleware';

const app = express();

// Define a route that uses the basicAuth middleware
app.get('/', basicAuth, (req, res) => {
    res.status(200).json({ message: 'Authorized' });
});

export default app;
