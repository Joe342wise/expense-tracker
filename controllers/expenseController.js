const Expense = require('../models/Expense');
const expenseCSV = require('../utilities/utils');
const path = require('path');
const fs = require('fs');


// Create new expense
exports.createExpense = async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      user: req.user._id
    });

    const newExpense = {
      user: req.user.name,
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
    }
    await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all expenses for logged-in user
exports.getExpenses = async (req, res) => {
  try {
    // const expenses = await Expense.find({ user: req.user._id });
    const {category, min, max, startDate, endDate, sort} = req.query;
    const query = {user: req.user._id};

    if (category) query.category = category;
    if (min || max) query.amount = {};
    if (min) query.amount.$gte = Number(min);
    if (max) query.amount.$lte = Number(max);
    if (startDate || endDate) query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);

    const sortOptions = {
      newest: { date: -1 },
      oldest: { date: 1 },
      high: { amount: -1 },
      low: { amount: 1 }
    };

    const expenses = await Expense.find(query).sort(sortOptions[sort] || {});

    // Filter expenses based on query parameters
    res.json(expenses);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get monthly summary of expenses for logged-in user
exports.getMonthlySummary = async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: { $month: '$date' },
          totalSpent: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpenseCSV = async (req, res) => {
  try {
    const expenses = await expenseCSV.getMonthlySummary(req.user._id);
    if (!expenses.length) return res.status(404).json({ error: 'No expenses found' });

    const filePath = path.join(__dirname, '../uploads/expenses.csv');
    await expenseCSV.writeCSVFile(filePath, expenses);

    res.download(filePath, 'expenses.csv', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error downloading the file');
      }
      // fs.unlinkSync(filePath); // Delete the file after download
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update expense if owned by user
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).json({ error: 'Expense not found or unauthorized' });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete expense if owned by user
exports.deleteExpense = async (req, res) => {
  try {
    const result = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!result) return res.status(404).json({ error: 'Expense not found or unauthorized' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
