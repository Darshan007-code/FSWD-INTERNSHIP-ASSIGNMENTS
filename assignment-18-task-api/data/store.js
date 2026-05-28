let tasks = [
  { id: 1, title: "Buy groceries", description: "Milk, eggs, bread", status: "pending", priority: "medium", createdAt: new Date().toISOString() },
  { id: 2, title: "Complete internship assignment", description: "Build CRUD API for task manager", status: "in-progress", priority: "high", createdAt: new Date().toISOString() },
  { id: 3, title: "Go for a walk", description: "30 minute evening walk", status: "completed", priority: "low", createdAt: new Date().toISOString() },
];

let nextId = 4;

module.exports = { tasks, getNextId: () => nextId++ };
