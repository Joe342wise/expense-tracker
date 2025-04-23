# 📘 Personal Expense Tracker Backend

> A secure and extendable Expense Tracking API built with Node.js, Express, MongoDB, and JWT authentication.

---

## 🔧 Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs (for password hashing)
- dotenv
- cors

---

## 📁 Project Structure

```
project-root/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── expenseController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Expense.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── expenseRoutes.js
├── .env
├── server.js
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file:

```env
PORT=2000
MONGO_URI=mongodb://localhost:27017/expense_tracker
JWT_SECRET=your_jwt_secret
```

### 3. Run the Server

```bash
npx nodemon server.js
```

---

## 📦 Phase 1: Expense CRUD

### Expense Model (`models/Expense.js`)

```js
{
  title: String,
  amount: Number,
  category: String,
  date: Date (default: now),
  user: ObjectId (ref: 'User')
}
```

### Expense Routes

```js
POST    /api/expenses           // Create new expense
GET     /api/expenses           // Get all expenses (filtered by user)
PUT     /api/expenses/:id       // Update expense
DELETE  /api/expenses/:id       // Delete expense
```

---

## 🔐 Phase 2: User Authentication

### User Model (`models/User.js`)

```js
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Auth Routes

```js
POST /api/auth/register   // Register new user
POST /api/auth/login      // Login and get token
```

### Auth Features

- Passwords are hashed using bcrypt
- JWT token returned on login
- Protected routes use middleware

---

## 📊 Phase 3: Advanced Filtering & Summaries

### Filtering and Sorting

Supports query params:

```
GET /api/expenses?category=Food&min=10&max=100&startDate=2025-04-01&endDate=2025-04-30&sort=high
```

### Summary Routes

```js
GET /api/expenses/summary/monthly   // Monthly summary
GET /api/expenses/summary/category  // Category summary
```

#### Monthly Summary Response

```json
[
  { "month": "April", "year": 2025, "totalSpent": 300, "count": 5 }
]
```

#### Category Summary Response

```json
[
  { "category": "Food", "totalSpent": 150, "count": 3 }
]
```

---

## 📤 CSV Export Endpoints (Optional)

```js
GET /api/expenses/monthly/csv     // Download monthly summary CSV
GET /api/expenses/category/csv    // Download category summary CSV
```

---

## 🛡️ Auth Middleware

Middleware that protects private routes:

```js
Authorization: Bearer <token>
```

---

## 🌐 CORS Configuration

```js
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

---

## 📬 Ping Test Route (optional)

```js
GET /api/ping  // Returns { message: 'pong' }
```

---

> Frontend (Phase 4) is under development.
