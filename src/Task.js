export default class Task {
  constructor(id, text = 'New Task', completed = false, order = 0) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.order = order;
  }

  createTaskElement() {
    const newTask = document.createElement('div');
    newTask.classList.add('task', 'pt-3');

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('task-btn');
    button.innerHTML = '<i class="lni lni-chevron-right"></i>';
    newTask.appendChild(button);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', this.id);
    checkbox.setAttribute('name', this.text);
    checkbox.setAttribute('value', this.text);
    checkbox.checked = this.completed;
    newTask.appendChild(checkbox);

    const label = document.createElement('label');
    label.setAttribute('for', this.id);
    label.textContent = this.text;
    label.classList.add('task-label-placeholder'); // Add placeholder class
    label.contentEditable = true; // Make label editable
    label.addEventListener('focus', () => {
      label.classList.remove('task-label-placeholder'); // Remove placeholder class on focus
    });
    label.addEventListener('blur', () => {
      if (label.textContent === '') {
        label.classList.add('task-label-placeholder'); // Add placeholder class if content is empty
      }
    });
    label.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        label.blur(); // Remove focus from label
      }
    });
    label.addEventListener('input', () => {
      this.editTask(label.textContent);
      label.classList.remove('task-label-placeholder'); // Remove placeholder class on input
    });
    newTask.appendChild(label);

    const timeBox = document.createElement('div');
    timeBox.classList.add('time');
    timeBox.textContent = '2h';
    newTask.appendChild(timeBox);

    return newTask;
  }

  handleCheckboxChange(checkbox, store) {
    this.completed = checkbox.checked;
    store.editTaskById(this.id, this.text, this.completed, this.order);
  }

  editTask(newText, newCompleted) {
    this.text = newText;
    if (typeof newCompleted === 'boolean') {
      this.completed = newCompleted;
    }
  }
}
