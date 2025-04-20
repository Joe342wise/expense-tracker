// dashboard.js

// Redirect if not logged in
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'index.html'; // Change if your login page has a different name
}

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

// Headers for all fetch requests
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

// Fetch & display monthly summary
const loadMonthlySummary = async () => {
  const res = await fetch('http://localhost:2000/api/expenses/summary/monthly', { headers });
  const data = await res.json();

  const container = document.getElementById('monthly-summary');
  container.innerHTML = '';

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'summary-card';
    div.innerHTML = `<strong>${item.month} ${item.year}</strong>: $${item.totalSpent} (${item.count} items)`;
    container.appendChild(div);
  });
};

// Fetch & display category summary
const loadCategorySummary = async () => {
  const res = await fetch('http://localhost:2000/api/expenses/summary/category', { headers });
  const data = await res.json();

  const container = document.getElementById('category-summary');
  container.innerHTML = '';

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'summary-card';
    div.innerHTML = `<strong>${item.category}</strong>: $${item.totalSpent} (${item.count} items)`;
    container.appendChild(div);
  });
};

// Initial load
loadMonthlySummary();
loadCategorySummary();
