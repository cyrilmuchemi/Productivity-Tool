import './style.css';
import './scss/styles.scss';
// import * as bootstrap from 'bootstrap';

const hamBurger = document.querySelector('.toggle-btn');

hamBurger.addEventListener('click', () => {
  document.querySelector('#sidebar').classList.toggle('expand');
});

class Task {
  static addTaskBtn = document.getElementById('add-task');

  static taskBody = document.querySelector('.task-body');

  static time;

  set time(myTime) {
    this.time = myTime;
  }

  get time() {
    return this.time;
  }

  static addTask() {
    this.addTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const newTask = document.createElement('div');
      newTask.classList.add('task', 'pt-3');

      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('task-btn');
      button.innerHTML = '<i class="lni lni-chevron-right"></i>';
      newTask.appendChild(button);

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('id', 'new-task');
      checkbox.setAttribute('name', 'New Task');
      checkbox.setAttribute('value', 'New Task');
      newTask.appendChild(checkbox);

      const label = document.createElement('label');
      label.setAttribute('for', 'new-task');
      label.textContent = 'New Task';
      newTask.appendChild(label);

      const timeBox = document.createElement('div');
      timeBox.classList.add('time');
      timeBox.textContent = this.time;
      newTask.appendChild(timeBox);

      const firstTask = this.taskBody.querySelector('.task');
      this.taskBody.insertBefore(newTask, firstTask);
    });
  }
}

Task.time = '2m';
Task.addTask();