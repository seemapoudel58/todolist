document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const ul = document.getElementById("todo-list");
  const removeAllTasksButton = document.querySelector(".remove-task-button");

  class Todo {
    constructor(task) {
      this.task = task;
      this.completed = false;
    }
  }

  class TodoList {
    constructor() {
      this.items = [];
    }

    initializeWithCachedTodos() {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      this.items = todos;
    }

    addTodo(todo) {
      this.items.push(todo);
      this.saveTodoToLocalStorage();
      this.renderToPage();
    }

    removeTodo(task) {
      this.items = this.items.filter((item) => item.task !== task);
      this.saveTodoToLocalStorage();
      this.renderToPage();
    }

    markTodoAsCompleted(task) {
      const todo = this.items.find((item) => item.task === task);
      if (todo) {
        todo.completed = !todo.completed; // Toggle completion status
        this.saveTodoToLocalStorage();
        this.renderToPage();
      }
    }

    saveTodoToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.items));
    }

    renderToPage() {
      ul.innerHTML = ""; // Clear the existing list

      this.items.forEach((item) => {
        const li = document.createElement("li");

        // Determine the status (completed or incomplete) and corresponding icon
        const status = item.completed ? "completed" : "incomplete";
        const icon = item.completed ? "fa-check-circle" : "fa-solid fa-check";
        const statusTextClass = item.completed
          ? "completed-text"
          : "incomplete-text"; // Add status text class

        li.innerHTML = `
          <span class="task ${status}">${item.task}</span>
          <button class="complete-button">
            <i class="fas ${icon}"></i>
          </button>
          <button class="delete-button">
            <i class="fas fa-trash"></i>
          </button>
          <span class="${statusTextClass}">${
          item.completed ? "Completed" : "Incomplete"
        }</span>
        `;

        ul.appendChild(li);
      });

      // Add event listeners for the complete and delete buttons
      const completeButtons = ul.querySelectorAll(".complete-button");
      completeButtons.forEach((button, index) => {
        button.addEventListener("click", () => handleCompleteTask(index));
      });

      const deleteButtons = ul.querySelectorAll(".delete-button");
      deleteButtons.forEach((button, index) => {
        button.addEventListener("click", () => handleDeleteTask(index));
      });
    }
  }

  const TODO_LIST = new TodoList();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value === "") return;

    const newTask = new Todo(input.value);

    TODO_LIST.addTodo(newTask);

    input.value = "";
  });

  function handleCompleteTask(index) {
    const task = TODO_LIST.items[index].task;
    TODO_LIST.markTodoAsCompleted(task);
  }


  function handleDeleteTask(index) {
    const task = TODO_LIST.items[index].task;
    TODO_LIST.removeTodo(task);
  }

  function removeAllTasks() {    
      // Get a list of all of the todo items
      const todoItems = TODO_LIST.items;
    
      // Remove all of the todo items from the list
      todoItems.splice(0, todoItems.length);
    
      // Update the local storage
      TODO_LIST.saveTodoToLocalStorage();
    
      // Render the updated todo list
      TODO_LIST.renderToPage();
  }
  removeAllTasksButton.addEventListener("click", removeAllTasks);
  TODO_LIST.addTodo = function(todo) {
    this.items.push(todo);
    this.saveTodoToLocalStorage();
    this.renderToPage();
  
    // Show the "Remove Task" button
    const removeTaskButton = document.querySelector(".remove-task-button");
    removeTaskButton.style.display = "block";
  };
  TODO_LIST.initializeWithCachedTodos();
  TODO_LIST.renderToPage();
});