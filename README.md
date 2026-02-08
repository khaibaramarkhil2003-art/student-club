
# 🎓 Students Club Website – Backend API

A professional and secure **Backend REST API** built with **Node.js, Express, and MongoDB** for managing a Students Club Website.

This project is designed as a **final academic project**, following best practices in backend development, authentication, security, and clean architecture.

---

##  Project Overview

The **Students Club Website API** allows students to:
- Register and log in securely
- Access and update their personal profile
- Create, read, update, and delete club posts (events, announcements, news)
- Access protected routes using JWT authentication

The project follows a **modular architecture**, making it scalable, readable, and easy to maintain.

---

##  Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend web framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **JWT (JSON Web Token)** – Authentication & authorization
- **bcryptjs** – Password hashing
- **dotenv** – Environment variables
- **Nodemon** – Development auto-restart tool

---

##  Project Structure

students-club-website/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── postController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── postRoutes.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
├── package-lock.json
└── README.md

---

##  Installation & Setup (Step by Step)

### 1 Download or Clone Project
```bash
git clone <repository-url>
cd students-club-website
```

### 2 Install Dependencies
```bash
npm install
```

### 3 Create Environment Variables
Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/students_club
JWT_SECRET=studentsclubsecret
```

### 4 Run the Project
```bash
npm run dev
```

If successful, you will see:
```
MongoDB connected
Server running on port 3000
```

---

##  Authentication & Security

- Passwords are hashed using **bcrypt**
- JWT tokens are generated during login
- Private routes are protected using middleware
- Token format:
```
Authorization: Bearer <JWT_TOKEN>
```

---

##  API Endpoints

###  Authentication Routes (Public)

| Method | Endpoint | Description |
|------|--------|------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user and receive token |

---

###  User Routes (Private)

| Method | Endpoint | Description |
|------|--------|------------|
| GET | /api/users/profile | Get user profile |
| PUT | /api/users/profile | Update user profile |

---

###  Post Routes (Private)

| Method | Endpoint | Description |
|------|--------|------------|
| POST | /api/posts | Create a post |
| GET | /api/posts | Get all posts |
| GET | /api/posts/:id | Get a specific post |
| PUT | /api/posts/:id | Update a post |
| DELETE | /api/posts/:id | Delete a post |

---

##  API Testing

All endpoints were tested using **ApiDog / Postman**.
JWT token is required for private routes.

---

##  Academic Requirements Fulfilled

-  Modular backend structure
-  MongoDB with Mongoose schemas
-  JWT authentication & authorization
-  CRUD operations
-  Secure password handling
-  Ready for deployment
-  Defense-ready project

---

##  Author

Khaibar Amarkhail_IT-2402
