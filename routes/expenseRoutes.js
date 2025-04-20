const express = require('express');
const router = express.Router();
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getMonthlySummary,
  getExpenseCSVMonthly,
  getCategorySummary,
  getExpenseCSVCategory
} = require('../controllers/expenseController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createExpense);
router.get('/', protect, getExpenses);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);
router.get('/summary/monthly', protect, getMonthlySummary);
router.get('/summary/category', protect, getCategorySummary);
router.get('/monthly/csv', protect, getExpenseCSVMonthly);
router.get('/category/csv', protect, getExpenseCSVCategory);

module.exports = router;
