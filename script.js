var task = document.getElementById("task");
var date = document.getElementById("date");
var taskList = document.getElementById("taskList");

var tasks = [];

// Load tasks from Local Storage
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

showTasks();

// Add Task
function addTask() {

    if (task.value == "") {
        alert("Please enter a task");
        return;
    }

    var newTask = {
        name: task.value,
        date: date.value,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    showTasks();

    task.value = "";
    date.value = "";
}

// Display Tasks
function showTasks() {

    taskList.innerHTML = "";

    for (var i = 0; i < tasks.length; i++) {

        var li = document.createElement("li");

        if (tasks[i].completed) {
            li.className = "done";
        }

        li.innerHTML =
            "<b>" + tasks[i].name + "</b><br>" +
            tasks[i].date + "<br>";

        // Complete Button
        var completeBtn = document.createElement("button");
        completeBtn.innerHTML = "Complete";

        completeBtn.onclick = (function(index) {
            return function() {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                showTasks();
            };
        })(i);

        li.appendChild(completeBtn);

        // Edit Button
        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.style.marginLeft = "5px";

        editBtn.onclick = (function(index) {
            return function() {

                var updatedTask = prompt("Edit Task", tasks[index].name);

                if (updatedTask != null && updatedTask != "") {
                    tasks[index].name = updatedTask;
                    saveTasks();
                    showTasks();
                }

            };
        })(i);

        li.appendChild(editBtn);

        // Delete Button
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.style.marginLeft = "5px";

        deleteBtn.onclick = (function(index) {
            return function() {

                tasks.splice(index, 1);

                saveTasks();

                showTasks();

            };
        })(i);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    }
}

// Save Tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}