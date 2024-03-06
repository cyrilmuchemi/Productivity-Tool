import Task from './Task';

export default class Store {
  constructor() {
    this.tasks = Store.loadTasks();
  }

  addTask(task) {
    // Increase order for existing tasks to make room for the new task
    // eslint-disable-next-line no-plusplus
    this.tasks.forEach((t) => t.order++);
    // Use the actual text entered by the user
    const newTaskText = task.text.trim(); // Trim any leading/trailing whitespace
    if (newTaskText !== '') {
      task.text = newTaskText;
    }

    this.tasks.unshift(task); // Add the new task to the beginning of the array
    this.saveTasks();
  }

  editTaskById(id, newText, newCompleted, newOrder) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.editTask(newText, newCompleted);
      if (newOrder !== undefined) {
        task.order = newOrder;
      }
      this.saveTasks();
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  static loadTasks() {
    const tasksData = localStorage.getItem('tasks');
    if (!tasksData) {
      return [];
    }

    try {
      const tasks = JSON.parse(tasksData);
      // eslint-disable-next-line max-len
      return tasks.map((taskData, index) => new Task(taskData.id, taskData.text, taskData.completed, index));
    } catch (error) {
      console.error('Error parsing tasks:', error);
      return [];
    }
  }
}