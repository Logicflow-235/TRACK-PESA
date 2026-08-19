# Track Pesa

Designed to help me — and other people like me — who have a money problem. Track Pesa is a personal finance tracker built with a Kenyan market focus, so you can track income, expenses, and category budgets all in one place.

**Live app:** https://track-pesa.vercel.app/

## About

Track Pesa started as a way to solve a real problem: keeping tabs on personal spending. It's also doubled as a hands-on sandbox for learning backend development, kept deliberately separate from other production work so it's safe to experiment in.

## Tech Stack

**Frontend**
- React + TypeScript
- Redux Toolkit (RTK Query for API calls)
- Deployed on Vercel

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT authentication
- Deployed on Render

## Features

- User registration and login with JWT-based auth (multi-user data isolation)
- Auto-login after registration
- Add, view, and delete transactions
- Full CRUD backed by MongoDB
- Logout support, with UI gated behind login state
- Dark/green themed UI, including a landing screen with Login/Create Account options
- Per-category budgets — allocate a percentage of total income to each spending category (percentages must total 100%)

## Project Status

Core flow (register → login → add transaction → view → delete) is complete and tested end-to-end against the live backend. TypeScript typing has been tightened throughout, and the app is fully deployed.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- A MongoDB Atlas connection string

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd track-pesa

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory with:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

> **Note:** Never commit your `.env` file. Make sure it's listed in `.gitignore`.

### Running Locally

```bash
# Start the backend
cd server
npm run dev

# Start the frontend
cd client
npm start
```

## License

This project is for personal/learning purposes.
