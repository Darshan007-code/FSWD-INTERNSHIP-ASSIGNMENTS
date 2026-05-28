// MODEL: Manages task data and business logic

let tasks = [
  { id: 1, title: "Buy groceries", description: "Milk, eggs, bread", status: "pending", priority: "medium", createdAt: new Date().toISOString() },
  { id: 2, title: "Complete internship assignment", description: "MVC Refactor", status: "in-progress", priority: "high", createdAt: new Date().toISOString() },
  { id: 3, title: "Go for a walk", description: "30 minute evening walk", status: "completed", priority: "low", createdAt: new Date().toISOString() },
];

let nextId = 4;

const TaskModel = {
  getAll: (filters = {}) => {
    let result = [...tasks];
    if (filters.status) result = result.filter((t) => t.status === filters.status);
    if (filters.priority) result = result.filter((t) => t.priority === filters.priority);
    return result;
  },

  getById: (id) => tasks.find((t) => t.id === parseInt(id)),

  create: (data) => {
    const task = {
      id: nextId++,
      title: data.title,
      description: data.description || "",
      status: "pending",
      priority: data.priority || "medium",
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
  },

  update: (id, data) => {
    const index = tasks.findIndex((t) => t.id === parseInt(id));
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...data, updatedAt: new Date().toISOString() };
    return tasks[index];
  },

  delete: (id) => {
    const index = tasks.findIndex((t) => t.id === parseInt(id));
    if (index === -1) return null;
    return tasks.splice(index, 1)[0];
  },

  isValidStatus: (status) => ["pending", "in-progress", "completed"].includes(status),
  isValidPriority: (priority) => ["low", "medium", "high"].includes(priority),
};

module.exports = TaskModel;
