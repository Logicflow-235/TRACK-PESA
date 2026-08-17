const { z } = require('zod');

const CATEGORIES = [
  'salary', 'food', 'transport', 'rent', 'entertainment',
  'other', 'savings', 'health', 'investment',
];

const transactionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  amount: z.number().positive('Amount must be a positive number'),
  category: z.enum(CATEGORIES),
  type: z.enum(['income', 'expense']),
  date: z.string().min(1, 'Date is required'),
});

const budgetCategorySchema = z.object({
  category: z.enum(CATEGORIES),
  percentage: z.number().min(0).max(100),
});

const addBudgetSchema = z.object({
  budgets: z.array(budgetCategorySchema).refine(
    (budgets) => budgets.reduce((sum, b) => sum + b.percentage, 0) === 100,
    { message: 'Budgets must add up to 100' }
  ),
});

const editBudgetSchema = z.object({
  category: z.enum(CATEGORIES),
  percentage: z.number().min(0).max(100),
});

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

module.exports = {
  transactionSchema,
  addBudgetSchema,
  editBudgetSchema,
  registerSchema,
  loginSchema,
};