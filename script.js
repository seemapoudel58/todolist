document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const ul = document.getElementById("todo-list");
  const removeTasksButton = document.querySelector(".remove-task-button");

  class Todo {
    constructor(task, id) {
      this.task = task;
      this.completed = false;
      this.id = id;
    }
  }

  class TodoList {
    constructor() {
      this.items = [];
    }

    initializeWithCachedTodos() {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      todos.forEach((todo) => {
        const newTodo = new Todo(todo.task, todo.id);
        this.items.push(newTodo);
      });
    }

    addTodo(todo) {
      this.items.push(todo);
      this.saveTodoToLocalStorage();
      this.renderToPage();

      const removeTaskButton = document.querySelector(".remove-task-button");
      removeTaskButton.style.display = "block";
    }

    removeTodo(id) {
      this.items = this.items.filter((item) => item.id !== id);
      this.saveTodoToLocalStorage();
      this.renderToPage();
    }

    markTodoAsCompleted(id) {
      const todo = this.items.find((item) => item.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveTodoToLocalStorage();
        this.renderToPage();
      }
    }

    saveTodoToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.items));
    }

    renderToPage() {
      ul.innerHTML = "";

      this.items.forEach((item) => {
        const li = document.createElement("li");

        const status = item.completed ? "completed" : "incomplete";
        const icon = item.completed ? "fa-check-circle" : "fa-solid fa-check";
        const statusTextClass = item.completed
          ? "completed-text"
          : "incomplete-text";

          li.innerHTML = `
          <span class="task ${status}">${item.task}</span>
          <button class="complete-button" data-id="${item.id}">
            <i class="fas ${icon}"></i>
          </button>
          <button class="delete-button" data-id="${item.id}">
            <i class="fas fa-trash"></i>
          </button>
          <span class="${statusTextClass}">${
          item.completed ? "Completed" : "Incomplete"
        }</span>
        `;
        ul.appendChild(li);
      });

      const completeButtons = ul.querySelectorAll(".complete-button");
      completeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const id = parseInt(event.currentTarget.getAttribute("data-id"));
          this.markTodoAsCompleted(id);
        });
      });

      const deleteButtons = ul.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const id = parseInt(event.currentTarget.getAttribute("data-id"));
          this.removeTodo(id);
        });
      });
      if (this.items.length === 0) {
        removeTasksButton.style.display = "none";
      } else {
        removeTasksButton.style.display = "block";
      }
    }
  }

  const TODO_LIST = new TodoList();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value === "") return;

    const newId = Date.now(); // Generate a unique ID (you can use a more robust method in a real application)
    const newTask = new Todo(input.value, newId);

    TODO_LIST.addTodo(newTask);

    input.value = "";
  });

  removeTasksButton.addEventListener("click", removeAllTasks);

  function removeAllTasks() {
    TODO_LIST.items = [];
    TODO_LIST.saveTodoToLocalStorage();
    TODO_LIST.renderToPage();
  }

  TODO_LIST.initializeWithCachedTodos();
  TODO_LIST.renderToPage();
});
        
          
