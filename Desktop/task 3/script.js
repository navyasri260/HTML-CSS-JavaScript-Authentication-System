// Load tasks when page opens
window.onload = function () {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value;

  if (task === "") {
    alert("Enter a task");
    return;
  }

  saveTask(task);

  input.value = "";
  loadTasks();
}

// Save task to localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push({ text: task, completed: false });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = task.text;

    // If completed
    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    }

    // Toggle complete
    span.onclick = function () {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.style.marginLeft = "10px";

    delBtn.onclick = function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };

    li.appendChild(span);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}