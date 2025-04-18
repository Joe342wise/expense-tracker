const Expense = require('../models/Expense');

// Create new expense
exports.createExpense = async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      user: req.user._id
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all expenses for logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
