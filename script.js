let toStartContainer = document.querySelector(".to-start-container");
let inProgressContainer = document.querySelector(".in-progress-container");
let underReviewContainer = document.querySelector(".under-review-container");
let completedContainer = document.querySelector(".completed-container");

// Variable to store the currently dragged item
let selected = null;

// Get all existing task items with the 'lists' class
const lists = document.querySelectorAll(".lists");

// Make each initial task item draggable
lists.forEach((list) => {
  makeDraggable(list);
});

// Define a helper function to make any element draggable
function makeDraggable(element) {
  element.setAttribute("draggable", "true");
  element.addEventListener("dragstart", (event) => {
    selected = event.target; // Store the dragged element
  });
}

// Group all containers into an array
const containers = [
  toStartContainer,
  inProgressContainer,
  underReviewContainer,
  completedContainer,
];

// Make each container able to accept dragged tasks
containers.forEach((container) => {
  container.addEventListener("dragover", (event) => {
    event.preventDefault(); // Allow dropping
  });

  container.addEventListener("drop", (event) => {
    event.preventDefault(); // Prevent default behavior

    if (selected) {
      const addButton = container.querySelector(".addToDoButton");

      if (addButton) {
        // Always insert the dragged task after the Add New button
        container.insertBefore(selected, addButton.nextSibling);
      } else {
        container.appendChild(selected); // fallback
      }

      selected = null; // Reset after drop
    }
  });
});

// Reference to the main container that holds all sections
const mainContainer = document.querySelector(".main-container");

//Function to create a new empty todo item in a container
function addEmptyToDoInTheContainer(Container, addToDoButton) {
  const newTodoItem = document.createElement("div");
  newTodoItem.className = "lists";
  newTodoItem.innerHTML = `
    <input type="text" placeholder="Title" class="todo-heading" />
    <input type="text" placeholder="Description" class="todo-description" />
    <select class="priority">
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
      <option value="Urgent">Urgent</option>
    </select>
    <button class="addTaskButton">Add Task</button>
    <button class="cancel-task">Cancel Task</button>
  `;

  makeDraggable(newTodoItem); // Make the new task draggable

  // Insert the new todo above the 'Add To Do' button
  Container.insertBefore(newTodoItem, addToDoButton);
  // Insert *after* the Add New button
  if (addToDoButton) {
    // Insert *after* the Add New button
    addToDoButton.insertAdjacentElement("afterend", newTodoItem);
  } else {
    container.appendChild(newTodoItem); // fallback
  }
}

// Listen for clicks inside the main container
mainContainer.addEventListener("click", (event) => {
  const addToDoButton = event.target.closest(".addToDoButton");

  // Check which container the click happened in
  const toStartContainer = event.target.closest(".to-start-container");
  const inProgressContainer = event.target.closest(".in-progress-container");
  const underReviewContainer = event.target.closest(".under-review-container");
  const completedContainer = event.target.closest(".completed-container");

  // Handle Add To Do button click
  if (addToDoButton) {
    if (toStartContainer && addToDoButton.parentNode === toStartContainer) {
      addEmptyToDoInTheContainer(toStartContainer, addToDoButton);
    }
    if (
      inProgressContainer &&
      addToDoButton.parentNode === inProgressContainer
    ) {
      addEmptyToDoInTheContainer(inProgressContainer, addToDoButton);
    }
    if (
      underReviewContainer &&
      addToDoButton.parentNode === underReviewContainer
    ) {
      addEmptyToDoInTheContainer(underReviewContainer, addToDoButton);
    }
    if (completedContainer && addToDoButton.parentNode === completedContainer) {
      addEmptyToDoInTheContainer(completedContainer, addToDoButton);
    }
  }
});

// Handle Add Task, Cancel Task, and Edit Task clicks
mainContainer.addEventListener("click", (event) => {
  const eachToDoContainer = event.target.closest(".lists");
  const addTaskButton = event.target.closest(".addTaskButton");
  const cancelTaskButton = event.target.closest(".cancel-task");

  const toStartContainer = event.target.closest(".to-start-container");
  const inProgressContainer = event.target.closest(".in-progress-container");
  const underReviewContainer = event.target.closest(".under-review-container");
  const completedContainer = event.target.closest(".completed-container");

  // Handle Add Task click inside a todo item
  if (eachToDoContainer && addTaskButton) {
    if (
      (toStartContainer && eachToDoContainer.parentNode === toStartContainer) ||
      (inProgressContainer &&
        eachToDoContainer.parentNode === inProgressContainer) ||
      (underReviewContainer &&
        eachToDoContainer.parentNode === underReviewContainer) ||
      (completedContainer &&
        eachToDoContainer.parentNode === completedContainer)
    ) {
      addTaskInTodo(eachToDoContainer);
    }
  }

  // Handle Cancel Task click (delete the todo item)
  if (eachToDoContainer && cancelTaskButton) {
    if (cancelTaskButton.parentNode === eachToDoContainer) {
      eachToDoContainer.remove();
    }
  }
});

// Function to finalize and create the display of a todo task
function addTaskInTodo(eachToDoContainer) {
  const todoHeading = eachToDoContainer.querySelector(".todo-heading");
  const todoDescription = eachToDoContainer.querySelector(".todo-description");
  const todoPriority = eachToDoContainer.querySelector(".priority");

  const headingValue = todoHeading.value.trim();
  const descriptionValue = todoDescription.value.trim();
  const priorityValue = todoPriority.value.trim().toLowerCase();

  // Set priority color based on value
  let priorityColor;
  switch (priorityValue) {
    case "low":
      priorityColor = "#8BC34A";
      break;
    case "medium":
      priorityColor = "#FFC107";
      break;
    case "high":
      priorityColor = "#FF9800";
      break;
    case "urgent":
      priorityColor = "#f44336";
      break;
    default:
      priorityColor = "#FFFFFF";
  }

  // Replace the editable form with task display
  eachToDoContainer.innerHTML = `
    <div class="task-container">
      <h3>${headingValue}</h3>
      <p class="description">${descriptionValue}</p>
      <p><strong>Priority:</strong> <span style="color: ${priorityColor};">${priorityValue.toUpperCase()}</span></p>
      <button class="edit-task">Edit Task</button>
    </div>
  `;

  makeDraggable(eachToDoContainer); // Re-make draggable after content change
}

// Handle Edit Task functionality
mainContainer.addEventListener("click", (event) => {
  const eachToDoContainer = event.target.closest(".lists");
  const editTodoContainer = event.target.closest(".task-container");
  const editTaskButton = event.target.closest(".edit-task");

  const toStartContainer = event.target.closest(".to-start-container");
  const inProgressContainer = event.target.closest(".in-progress-container");
  const underReviewContainer = event.target.closest(".under-review-container");
  const completedContainer = event.target.closest(".completed-container");

  // Only allow editing if inside a valid container
  if (editTaskButton && editTodoContainer && eachToDoContainer) {
    if (
      (toStartContainer && eachToDoContainer.parentNode === toStartContainer) ||
      (inProgressContainer &&
        eachToDoContainer.parentNode === inProgressContainer) ||
      (underReviewContainer &&
        eachToDoContainer.parentNode === underReviewContainer) ||
      (completedContainer &&
        eachToDoContainer.parentNode === completedContainer)
    ) {
      editToDo(editTodoContainer, eachToDoContainer);
    }
  }
});

// Function to show editable form for an existing todo task
function editToDo(editTodoContainer, eachToDoContainer) {
  const headingElement = editTodoContainer.querySelector("h3");
  const descriptionElement = editTodoContainer.querySelector(".description");
  const priorityElement = editTodoContainer.querySelector("span");

  if (headingElement && descriptionElement && priorityElement) {
    const originalHeading = headingElement.textContent;
    const originalDescription = descriptionElement.textContent;
    const originalPriority = priorityElement.textContent.trim();

    // Save the original data in dataset (optional if needed later)
    eachToDoContainer.dataset.originalHeading = originalHeading;
    eachToDoContainer.dataset.originalDescription = originalDescription;
    eachToDoContainer.dataset.originalPriority = originalPriority;

    // Replace task display with editable form
    editTodoContainer.innerHTML = `
      <input type="text" class="todo-heading" value="${originalHeading}" />
      <input type="text" class="todo-description" value="${originalDescription}" />
      <select class="priority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Urgent">Urgent</option>
      </select>
      <button class="update-task">Update Task</button>
      <button class="cancel-edit-task">Cancel Task</button>
    `;

    // Set priority value correctly
    const prioritySelect = editTodoContainer.querySelector(".priority");
    prioritySelect.value = originalPriority;

    const updateButton = editTodoContainer.querySelector(".update-task");
    const cancelButton = editTodoContainer.querySelector(".cancel-edit-task");

    // Handle Update Task click
    updateButton.addEventListener("click", () => {
      updateTask(eachToDoContainer, editTodoContainer);
    });

    // Handle Cancel Task click (delete the entire task if canceled)
    cancelButton.addEventListener("click", () => {
      eachToDoContainer.remove(); // Remove the task when canceled
    });
  }
}

// Function to update a task after editing
function updateTask(eachToDoContainer, editTodoContainer) {
  const todoHeading = editTodoContainer.querySelector(".todo-heading");
  const todoDescription = editTodoContainer.querySelector(".todo-description");
  const todoPriority = editTodoContainer.querySelector(".priority");

  const headingValue = todoHeading.value.trim();
  const descriptionValue = todoDescription.value.trim();
  const priorityValue = todoPriority.value.trim().toLowerCase();

  let priorityColor;
  switch (priorityValue) {
    case "low":
      priorityColor = "#8BC34A";
      break;
    case "medium":
      priorityColor = "#FFC107";
      break;
    case "high":
      priorityColor = "#FF9800";
      break;
    case "urgent":
      priorityColor = "#f44336";
      break;
    default:
      priorityColor = "#FFFFFF";
  }

  // Replace form with updated task display
  editTodoContainer.innerHTML = `
    <h3>${headingValue}</h3>
    <p class="description">${descriptionValue}</p>
    <p><strong>Priority:</strong> <span style="color: ${priorityColor};">${priorityValue.toUpperCase()}</span></p>
    <button class="edit-task">Edit Task</button>
  `;

  makeDraggable(eachToDoContainer); // Re-make draggable after update
}
