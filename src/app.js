const express = require('express');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());

// ⭐️ Serve frontend at http://localhost:3000
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Global error handler (always last)
app.use(errorHandler);

module.exports = app;
