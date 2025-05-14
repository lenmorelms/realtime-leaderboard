# 🏆 Real-Time Leaderboard Backend

A real-time leaderboard system for competitive games or activities. This backend API supports user authentication, score submission, leaderboard tracking, real-time updates via WebSockets, and historical reporting using Redis and MongoDB.

## 🔧 Tech Stack

- **Node.js + Express** – Backend server and REST API
- **MongoDB + Mongoose** – Persistent user and score history storage
- **Redis (Sorted Sets)** – Real-time leaderboard storage
- **Socket.IO** – Real-time leaderboard updates
- **JWT + bcrypt** – Secure user authentication

---

## 🚀 Features

### ✅ User Authentication
- Register & login endpoints
- Passwords securely hashed using `bcrypt`
- JWT-based session management

### 🧾 Score Submission
- Users can submit scores for specific games
- Scores stored in:
  - Redis (for real-time leaderboard updates)
  - MongoDB (for historical tracking)

### 📊 Leaderboards
- **Global** and **per-game** leaderboards
- View top N users or any user's rank
- Powered by Redis sorted sets

### ⚡ Real-Time Updates
- Leaderboard changes pushed instantly via WebSockets (Socket.IO)

### 📅 Top Players Report
- Query top users over a specific time range (e.g., past 24h, week)
- Aggregated from MongoDB score history

---

## 📁 Project Structure
├── config/
│   └── redis.js
├── controllers/
│   ├── authController.js
│   ├── leaderboardController.js
│   └── scoreController.js
├── models/
│   ├── User.js
│   └── Score.js
├── routes/
│   ├── auth.js
│   ├── leaderboard.js
│   ├── score.js
│   └── report.js
├── sockets/
│   └── socketHandler.js
├── .env
├── app.js
├── server.js
└── README.md

└── server.js

## 📦 Installation

### 1. Clone the repository

- git clone https://github.com/your-username/realtime-leaderboard.git
- cd realtime-leaderboard

### 2. Install dependencies

- npm install

### 3. Setup environment variables

- PORT=5000
- MONGODB_URI=mongodb://localhost:27017/leaderboard
- JWT_SECRET=your_jwt_secret
- REDIS_HOST=127.0.0.1
- REDIS_PORT=6379

### 4. Install redis on your local workspace

### ▶️ Running the Server

- npm run dev
- The server will start on http://localhost:5000

### Project Page On Roadmap
- https://roadmap.sh/projects/realtime-leaderboard-system

