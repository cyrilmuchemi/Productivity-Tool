import './style.css';
import './scss/styles.scss';
import Task from './Task';
import Store from './Store';

const hamBurger = document.querySelector('.toggle-btn');

hamBurger.addEventListener('click', () => {
  document.querySelector('#sidebar').classList.toggle('expand');
});

const addTaskBtn = document.getElementById('add-task');
const taskBody = document.querySelector('.task-body');

const taskManager = new Store();
// Add task event listener
addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const newTaskText = 'New Task';
  const newTaskId = `task-${taskManager.tasks.length}`;

  const newTask = new Task(newTaskId, newTaskText);
  const newTaskElement = newTask.createTaskElement();

  taskBody.insertBefore(newTaskElement, taskBody.firstChild);
  taskManager.addTask(newTask);

  // Attach event listener for checkbox change
  const checkbox = newTaskElement.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', () => {
    newTask.handleCheckboxChange(checkbox, taskManager);
  });
});

// Load existing tasks
taskManager.tasks.forEach((task) => {
  const taskElement = task.createTaskElement();
  taskBody.appendChild(taskElement);

  // Set initial checkbox state based on task's completed state
  const checkbox = taskElement.querySelector('input[type="checkbox"]');
  checkbox.checked = task.completed;

  // Attach event listener for checkbox change for each task
  checkbox.addEventListener('change', () => {
    // Update task state in local storage
    task.handleCheckboxChange(checkbox, taskManager);
    taskManager.editTaskById(task.id, task.text, checkbox.checked);
  });

  // Attach event listener for label input for each task
  const label = taskElement.querySelector('.task-label-placeholder');
  label.addEventListener('input', () => {
    // Update task text in local storage
    taskManager.editTaskById(task.id, label.textContent, task.completed);
  });
});
