export class Todo {
    constructor(task, id) {
      this.task = task;
      this.completed = false;
      this.id = id;
    }
  }
  
  export class TodoList {
    constructor() {
      this.items = [];
    }
  
    initializeWithCachedTodos() {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      todos.forEach((todo) => {
        const newTodo = new Todo(todo.task, todo.id);
        this.items.push(newTodo);
      });
  
      const ul = document.getElementById("todo-list"); 
      this.renderToPage(ul);
    }
  
    addTodo(todo) {
      this.items.push(todo);
      this.saveTodoToLocalStorage();
      this.renderToPage();
  
      const ul = document.getElementById("todo-list");  
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
      const ul = document.getElementById("todo-list"); 
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
  
  const removeTasksButton = document.querySelector(".remove-task-button");
  
  const TODO_LIST = new TodoList();
  TODO_LIST.initializeWithCachedTodos();
  