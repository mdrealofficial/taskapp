// Select DOM elements
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('items');
const completedList = document.querySelector('.complete-list ul');

let editingTask = null;

// Add Task
addTaskButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent form submission

  const taskText = taskInput.value.trim();
  if (taskText === '') return; // Do nothing if input is empty

  if (editingTask) {
    // Update the existing task
    editingTask.querySelector('label').textContent = taskText;
    resetEditing();
  } else {
    // Create a new task
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
  }

  taskInput.value = ''; // Clear the input field
});

// Create Task Item
function createTaskItem(taskText) {
  const li = document.createElement('li');
  li.classList.add('item');
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => markTaskAsCompleted(li, checkbox));

  const label = document.createElement('label');
  label.textContent = taskText;

  const editButton = document.createElement('button');
  editButton.classList.add('edit');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editTask(li, label));

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(editButton);
  
  return li;
}

// Edit Task
function editTask(taskItem, label) {
  taskInput.value = label.textContent;
  editingTask = taskItem;
  addTaskButton.value = 'Update Task';
}

// Reset Editing State
function resetEditing() {
  editingTask = null;
  addTaskButton.value = 'Add Task';
}

// Mark Task as Completed
function markTaskAsCompleted(taskItem, checkbox) {
  if (checkbox.checked) {
    taskItem.querySelector('.edit').remove(); // Remove edit button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(taskItem));
    taskItem.appendChild(deleteButton);

    completedList.appendChild(taskItem);
  } else {
    taskList.appendChild(taskItem);
  }
}

// Delete Task
function deleteTask(taskItem) {
  taskItem.remove();
}
