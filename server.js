const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();
const app = express();

connectDB();

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // Parse JSON body
app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});


const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
