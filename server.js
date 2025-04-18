const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

connectDB();

app.use(express.json()); // Parse JSON body
app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
