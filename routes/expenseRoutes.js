const express = require('express');
const router = express.Router();
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getMonthlySummary,
  getExpenseCSV
} = require('../controllers/expenseController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createExpense);
router.get('/', protect, getExpenses);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);
router.get('/summary/monthly', protect, getMonthlySummary);
router.get('/csv', protect, getExpenseCSV);

module.exports = router;
