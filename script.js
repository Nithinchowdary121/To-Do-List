const inputBox = document.getElementById("input-box"); 
const listContainer = document.getElementById("list-container"); 
 
// Load tasks from local storage on page load 
window.onload = function () {     
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];     
    tasks.forEach(task => {         
        addTaskToDOM(task.text, task.isDone); 
    }); 
}; 
// Add a task 
   function addtask() {     
    if (inputBox.value === '') {         
        alert("You must write something!"); 
    } else {         
        const taskText = inputBox.value;         
        addTaskToDOM(taskText, false);         
        saveToLocalStorage(taskText, false);         
        inputBox.value = ""; 
    } 
} 
function addTaskToDOM(taskText, isDone) {     
    let li = document.createElement("li");     
    li.innerHTML = taskText;     
    if (isDone) {         
        li.classList.add("checked"); 
    } 
    listContainer.appendChild(li);     
    let span = document.createElement("span");     
    span.innerHTML = "\u00d7";  
    li.appendChild(span);     
    // Click to mark as checked     
      li.addEventListener("click", function () {         
        li.classList.toggle("checked");         
        updateLocalStorage(); 
    }); 
    // Click on × to delete     
      span.addEventListener("click", function () {         li.remove();         updateLocalStorage(); 
    }); 
} 
// Save tasks to local storage 
  function saveToLocalStorage(taskText, isDone) {     
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];     
    tasks.push({ text: taskText, isDone });     
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
} 
// Update local storage when tasks change 
function updateLocalStorage() { 
    const tasks = [];     document.querySelectorAll("#list-container li").forEach(li => { 
        tasks.push({ text: li.textContent.replace("\u00d7", ""), isDone: li.classList.contains("checked") }); 
    }); 
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
} 
