# 💰 Track Pesa

A personal finance tracking web app built for the Kenyan market. Track your income and expenses, monitor your balance, and gain clarity on your spending habits.

## 🌐 Live Demo
[Track Pesa](https://track-pesa.vercel.app/)

## ✨ Features

- Add and delete income & expense transactions
- Real-time balance calculation
- Income vs expense summary
- Filter transactions by category
- Clean, modern dark UI

## 🛠️ Tech Stack

- **React** — UI library
- **TypeScript** — type-safe codebase
- **Redux Toolkit** — global state management
- **Tailwind CSS** — styling
- **Vite** — build tool

## 📦 Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/track-pesa.git
cd track-pesa
npm install
npm run dev
```

## 📁 Project Structure
src/

├── app/

│   ├── store.ts         # Redux store

│   └── hooks.ts         # Typed Redux hooks

├── features/

│   └── transactions/

│       └── transactionSlice.ts

├── components/

│   ├── Balance.tsx

│   ├── Summary.tsx

│   ├── AddTransaction.tsx

│   └── TransactionList.tsx

└── types/

└── index.ts

## 🔮 Roadmap

- [ ] M-Pesa transaction import
- [ ] Backend integration with Node.js & MongoDB
- [ ] Monthly spending reports
- [ ] Data export to PDF

## 👩‍💻 Author

**Theuri Linet**
[GitHub](https://github.com/Logicflow-235) • [Portfolio](https://my-portfolio-tau-ten-18.vercel.app)
