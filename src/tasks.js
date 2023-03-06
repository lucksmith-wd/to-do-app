function createTask(title, dueDate, details, isPriority, isDefault) {
  return {
    title, dueDate, details, isPriority, isDefault,
    isFinished: false,
    dateCreated: new Date(),
  }
}

export { createTask };