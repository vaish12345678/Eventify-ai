# 🚀 Eventify-AI

An advanced **Event Management Platform** built with Next.js, MongoDB, and Redis, featuring authentication, event registration, and high-performance caching.

---

## ✨ Features

*  JWT Authentication (Login/Register)
*  Role-Based Access Control (User / Organizer / Admin)
* Event Creation, Update, Delete
* Event Registration System
* Attendees Management
* Redis Caching for High Performance
* Cache Invalidation Strategy
* RESTful APIs using Next.js App Router
* Custom 404 (Not Found) Page

---

## 🏗️ Tech Stack

* **Frontend & Backend:** Next.js (App Router)
* **Database:** MongoDB (Mongoose)
* **Caching:** Redis
* **Authentication:** JWT (JSON Web Tokens)
* **Styling:** Tailwind CSS

---

## 📁 Project Structure

```src/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   └── register/route.js
│   │   │
│   │   ├── events/
│   │   │   ├── route.js             
│   │   │   ├── [id]/
│   │   │   │   ├── route.js          
│   │   │   │   ├── attendees/
│   │   │   │   │   └── route.js
│   │   │   │   └── register/
│   │   │   │       └── route.js
│   │   │
│   │   └── user/
│   │       └── my-registered/
│   │           └── route.js
│   │
│   ├── events/
│   │   ├── page.jsx
│   │   └── [id]/page.jsx
│   │
│   ├── not-found.jsx
│   ├── layout.jsx
│   └── page.jsx
│
├── components/
│   ├── ui/
│   └── common/
│
├── lib/
│   ├── db.js
│   ├── redisClient.js
│   └── utils.js
│
├── models/
│   ├── User.js
│   └── Event.js
│
├── styles/
│
└── constants/
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/eventify-ai.git
cd eventify-ai
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=asdfghjkmnbvcx
```

---

## 🚀 Run the project

```bash
npm run dev
```

App will run at:

```
http://localhost:3000
```

---

## ⚡ Caching Strategy (Redis)

* GET requests → Cached in Redis
* POST/PUT/DELETE → Cache invalidation
* Per-event caching → `event-attendees:{id}`
* Per-user caching → `my-registered:{email}`

---

## 🔐 Authentication Flow

* User registers / logs in
* JWT token stored in cookies
* Protected routes verify token
* Role-based access control implemented

---

## 📌 API Highlights

### Get All Events

```
GET /api/events
```

### Register for Event

```
POST /api/events/:id/register
```

### Get Attendees

```
GET /api/events/:id/attendees
```

---

## ❌ Error Handling

* Custom 404 page using `not-found.jsx`
* API-level error responses with proper status codes

---

## 💡 Future Improvements

* Middleware-based authentication
* Pagination & filtering
* Admin dashboard
* Real-time updates (WebSockets)

---

## 👩‍💻 Author

**Vaishnavi**
Full Stack Developer 🚀

