import { Todo, TodoList } from "./list.js"
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const removeTasksButton = document.querySelector(".remove-task-button");
  const ul = document.getElementById("todo-list");

 
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
        
          