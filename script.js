document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const ul = document.getElementById("todo-list");
  const removeTasksButton = document.querySelector(".remove-task-button");

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

      const completeButtons = ul.querySelectorAll(".complete-button");
      completeButtons.forEach((button, index) => {
        button.addEventListener("click", () => handleCompleteTask(index));
      });

      const deleteButtons = ul.querySelectorAll(".delete-button");
      deleteButtons.forEach((button, index) => {
        button.addEventListener("click", () => handleDeleteTask(index));
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
      const todoItems = TODO_LIST.items;
    
      todoItems.splice(0, todoItems.length);
    
      TODO_LIST.saveTodoToLocalStorage();
    
      TODO_LIST.renderToPage();
  }
  removeTasksButton.addEventListener("click", removeAllTasks);
  TODO_LIST.addTodo = function(todo) {
    this.items.push(todo);
    this.saveTodoToLocalStorage();
    this.renderToPage();
  
    const removeTaskButton = document.querySelector(".remove-task-button");
    removeTaskButton.style.display = "block";
  };
  TODO_LIST.initializeWithCachedTodos();
  TODO_LIST.renderToPage();
});