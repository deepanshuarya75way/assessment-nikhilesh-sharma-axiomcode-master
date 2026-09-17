# Axiom Code

A full-stack coding and DSA platform designed for practicing programming problems, running and submitting solutions, getting AI-assisted guidance, and competing in real-time 1v1 coding battles.

[Live Demo](https://axiomcode.vercel.app) · [GitHub Repository](https://github.com/S19nikhilesh/axiomcode-master)


## Overview

Axiom Code is a full-stack coding platform built to provide an interactive environment for learning and practicing Data Structures and Algorithms. It combines problem solving, code execution, AI-assisted learning, daily challenges, solution resources, and real-time competitive coding into a single platform.

The platform supports role-based access, allowing regular users to solve problems and track their progress while administrators can create and manage coding problems, test cases, reference solutions, and video editorials.


## Key Features

- **Problem Library** — Browse coding problems with status, difficulty, and topic-based filtering.
- **Online Code Editor** — Solve problems using a Monaco-based editor with support for C++, C, and Java.
- **Code Execution** — Run solutions against public test cases and submit them against hidden test cases.
- **Submission Tracking** — Store and review previous submissions along with their execution status.
- **AI DSA Assistant** — Get problem-aware hints and explanations using Gemini.
- **Reference Solutions** — View reference implementations for supported programming languages.
- **Video Editorials** — Access solution videos uploaded and managed through the admin panel.
- **Problem of the Day** — Solve a daily coding problem and maintain a consecutive solving streak.
- **1v1 Coding Arena** — Get matched with another user in real time and compete on the same coding problem.
- **Real-Time Results** — Receive live win/loss updates during arena matches using Socket.IO.
- **User Profiles** — Track solved problems, POTD progress, and coding activity.
- **Admin Dashboard** — Create, update, and delete problems, manage video solutions, and register new administrators.
- **Authentication & Authorization** — Secure user and admin access using JWT-based authentication, HTTP-only cookies, and role-based access control.
- **Redis Token Invalidation** — Logged-out JWTs are temporarily blacklisted using Redis until their expiration.


## Tech Stack

  ### Frontend
  - React.js
  - JavaScript (ES6+)
  - Redux Toolkit
  - React Router
  - Tailwind CSS
  - Monaco Editor
  - Axios
  - Socket.IO Client
  
  ### Backend
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Redis
  - Socket.IO
  - JWT
  - HTTP-only Cookies
  - bcrypt

  ### External Services
  - **Gemini API** — AI-powered DSA assistance
  - **JDoodle API** — Online code execution
  - **Cloudinary** — Video storage and delivery

  ### Development & Deployment
  - Git & GitHub
  - Vercel
  - Render

## System Architecture

Axiom Code follows a client-server architecture where the React frontend communicates with the Node.js/Express backend through REST APIs and Socket.IO.


                    ┌──────────────────────┐
                    │   React Frontend     │
                    │      (Vercel)        │
                    └──────────┬───────────┘
                               │
                    REST APIs / Socket.IO
                               │
                    ┌──────────▼───────────┐
                    │   Node.js + Express  │
                    │       Backend        │
                    └──────┬──────┬────────┘
                           │      │
             ┌─────────────┘      └──────────────┐
             │                                    │
      ┌──────▼──────┐                    ┌────────▼────────┐
      │  MongoDB    │                    │      Redis      │
      │  Database   │                    │ Token Blacklist │
      └─────────────┘                    └─────────────────┘
             │
             │
      ┌──────▼──────────────────────────────────────────┐
      │              External Services                  │
      │                                                  │
      │  Gemini API   │   JDoodle API   │   Cloudinary  │
      └─────────────────────────────────────────────────┘

                    Socket.IO
                       │
                ┌──────▼──────┐
                │  1v1 Arena  │
                │ Real-time   │
                │ Matchmaking │
                └─────────────┘

Architecture Components
React Frontend — Provides the user interface for authentication, problem solving, submissions, profiles, POTD, AI assistance, and the 1v1 arena.
Node.js + Express — Handles authentication, problem management, submissions, user profiles, admin operations, and API requests.
MongoDB — Stores users, problems, submissions, solutions, videos, and other application data.
Redis — Used for JWT token invalidation after logout.
Socket.IO — Enables real-time matchmaking and live updates in the 1v1 coding arena.
JDoodle API — Executes submitted code in supported programming languages.
Gemini API — Provides AI-powered explanations and DSA assistance.
Cloudinary — Stores and serves solution/editorial videos.


## Core Workflows

### 1. Authentication

- Users can register and log in through the authentication system.
- JWTs are issued after successful authentication and stored in HTTP-only cookies.
- Protected routes verify the user's authentication status before providing access.
- Role-based access control separates regular user and administrator functionality.
- On logout, the active JWT is added to a Redis blacklist until its expiration.

### 2. Problem Solving

- Users can browse problems using difficulty, topic, and solved/unsolved filters.
- Each problem provides a description, examples, reference solutions, and an integrated Monaco Editor.
- Users can select C++, C, or Java and write their solution using the provided starter code.
- The **Run** operation checks the solution against visible test cases.
- The **Submit** operation executes the solution against hidden test cases.
- Submission results are stored and can be viewed from the Submissions section.

### 3. AI DSA Assistant

The integrated AI assistant uses the Gemini API to provide problem-aware DSA guidance.

Users can ask questions such as:
- Explain the problem
- Help me understand the approach
- Give me a hint
- Explain a concept used in the problem

The assistant receives relevant problem context so that its responses are specific to the selected coding problem.

### 4. Problem of the Day

- A daily coding problem is provided to users.
- Users can track whether today's problem has been solved.
- Successful POTD submissions update the user's solving streak.
- The streak continues when consecutive daily problems are solved.

### 5. Real-Time 1v1 Coding Arena

The Arena provides real-time competitive coding through Socket.IO.

```
Player A ──┐
           ├── Matchmaking Queue ──► Match Created
Player B ──┘                              │
                                         ▼
                                  Same Problem
                                         │
                              ┌──────────┴──────────┐
                              ▼                     ▼
                         Player A              Player B
                              │                     │
                              └──── Submit ─────────┘
                                         │
                                         ▼
                              First Accepted Solution
                                         │
                              ┌──────────┴──────────┐
                              ▼                     ▼
                           Winner                 Loser
```

Players enter the matchmaking queue.
Two available players are matched together.
The same coding problem is assigned to both players.
The first player to submit an accepted solution wins the match.
Match results and contest score updates are delivered in real time.

## Admin Workflow

Administrators have access to a dedicated dashboard for managing platform content.

Create new coding problems.
Update existing problems.
Delete problems.
Configure visible and hidden test cases.
Add starter code, function calls, and reference solutions for C++, C, and Java.
Upload and manage video editorials through Cloudinary.
Register additional administrators.


## Project Structure

```
axiomcode-master/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server/
│   │   ├── sockets/
│   │   ├── utils/
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB
- Redis

### Clone the Repository

```bash
git clone https://github.com/S19nikhilesh/axiomcode-master.git
cd axiomcode-master
```

Frontend
```
cd frontend
npm install
npm run dev
```

Backend
Open a new terminal:
```
cd backend
npm install
npm run dev
```

Before starting the application, configure the required environment variables in the frontend and backend .env files.
## Environment Variables

The backend requires the following environment variables:

Create a `.env` file inside the `backend` directory:

```env
PORT=3000

DB_CONNECT_STRING=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
REDIS_PASS=your_redis_password

JDOODLE_CLIENT_ID=your_jdoodle_client_id
JDOODLE_CLIENT_SECRET_KEY=your_jdoodle_client_secret

GEMINI_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Where to get the credentials
MongoDB — Get the connection string from your MongoDB Atlas cluster.
Redis — Get the Redis credentials from your Redis provider.
JDoodle — Get the Client ID and Client Secret from your JDoodle developer account.
Gemini — Get the API key from Google AI Studio.
Cloudinary — Get the Cloud Name, API Key, and API Secret from your Cloudinary dashboard.
JWT_KEY — Generate a strong secret value for signing JWTs.
PORT — The backend server port. The default value is 3000.


## API Overview

The backend exposes REST APIs for authentication, problem management, submissions, user profiles, and administrative operations.

| Module | Purpose |
|---|---|
| Authentication | User registration, login, logout, and authentication checks |
| Problems | Fetch and manage coding problems |
| Submissions | Run and submit solutions and track results |
| Profile | View and update user profile information |
| POTD | Fetch the Problem of the Day and track solving streaks |
| Admin | Create, update, delete, and manage problems and content |
| Videos | Upload and manage solution/editorial videos |

Real-time 1v1 matchmaking and match updates are handled through **Socket.IO**.

## Screenshots

### Landing Page

![Axiom Code Landing Page](screenshots/landing.png)

### Problems Dashboard

![Problems Dashboard](screenshots/problems.png)

### Problem Solving & Code Editor

![Problem Solving](screenshots/problem-solving.png)

### AI DSA Assistant

![AI DSA Assistant](screenshots/ai-assistant.png)

### 1v1 Coding Arena

![1v1 Coding Arena](screenshots/arena.png)

### Problem of the Day

![Problem of the Day](screenshots/potd.png)

### User Profile

![User Profile](screenshots/profile.png)

### Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

## Live Demo

Axiom Code is fully deployed and can be accessed directly through the live application.

**Live Application:** https://axiomcode.vercel.app

The frontend is deployed on **Vercel**, while the backend is deployed on **Render**.

## Future Improvements

- Expand the problem library with more DSA topics and difficulty levels.
- Improve the 1v1 arena with persistent match history and leaderboards.
