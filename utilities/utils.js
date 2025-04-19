const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const fs = require('fs');
const path = require('path');

// exports.getMonthlySummary = async (userId) => {
//   try {
//     const summary = await Expense.aggregate([
//       { $match: { user: userId } },
//       {
//         $group: {
//           _id: { $month: '$date' },
//           totalSpent: { $sum: '$amount' },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { '_id': 1 } }
//     ]);

//     return summary;
//   } catch (err) {
//     throw new Error('Error fetching monthly summary: ' + err.message);
//   }
// };

exports.getMonthlySummary = async (userId) => {
  try {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const summary = await Expense.aggregate([
      {
        $match: {
          user: userId
        }
      },
      {
        $group: {
          _id: { month: { $month: '$date' }, year: { $year: '$date' } },
          totalSpent: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const formatted = summary.map(item => ({
      month: monthNames[item._id.month - 1],
      year: item._id.year,
      totalSpent: item.totalSpent,
      count: item.count
    }));

    console.log(formatted); // Log the formatted summary for debugging
    return(formatted);
  } catch (err) {
    throw new Error('Error fetching monthly summary: ' + err.message);
  }
};


exports.getCSVHeader = (data) => {
  const headers = Object.keys(data[0]);
  console.log(headers); // Log headers for debugging
  return headers.join(',') + '\n';
}

exports.getCSVData = (data) => {
  return data.map(row => {
    return Object.values(row).map(value => {
      if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`; // Escape double quotes
      }
      return value;
    }).join(',');
  }).join('\n');
}

exports.writeCSVFile = async(filePath, data) => {
  const csvHeader = this.getCSVHeader(data);
  const csvData = this.getCSVData(data);
  const csvContent = csvHeader + csvData;

  await fs.writeFile(filePath, csvContent, { encoding: 'utf8' }, (err) => {
    if (err) {
      throw new Error('Error writing CSV file: ' + err.message);
    }
  });
}