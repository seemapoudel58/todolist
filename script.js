const form = document.querySelector("form")
const input = document.querySelector("input")

class Todo {
  constructor(task) {
    this.id = Date.now();
    this.task = task;
    this.completed = false; 
  }
}

class TodoList {
  constructor() {
    this.items = [];
  }
  
  initializeWithCachedTodos(todos) {
    this.items = todos;
  }
  
  addTodo(todo) {
    this.items.push(todo);
  }
  
  removeTodo(todoId) {
    // Complete this function
  }
    
    
  
  markTodoAsCompleted(todoId) {
  }
  
  saveTodoToLocalStorage() {
  }
  
  
  renderToPage() {
    const ul = document.createElement("ul");
    ul.innerText = "";
    
    // debugger;
    
    this.items.forEach((item) => {
      const li = document.createElement("li");
      
      const status = item.completed ? "completed" : "incomplete";
      
      li.innerText = `${item.task} - ${status}`;
      li.id = item.id;
      
      li.addEventListener("click", handleStatusChange);
      ul.appendChild(li);
    }); 
  }
}


const TODO_LIST = new TodoList();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value === "") return;
  
  const newTask = new Todo(input.value);
  
  TODO_LIST.addTodo(newTask);
  TODO_LIST.renderToPage();
  TODO_LIST.saveTodoToLocalStorage();
  
  input.value = ""; 
});

function handleStatusChange(event) {
  console.log(event.target.id)
  console.log(TODO_LIST)
}