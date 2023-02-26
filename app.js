////////////////// [1] select element form HTML //////////////////////////
let input = document.querySelector(".container .form .input");
let btnSubmit = document.querySelector(".container .form .add");
let tasksDiv = document.querySelector(".container .tasks ");
let tasksArray = [];
/////////////////////////////////////////////////////////////////////////
getTaskFormLocal();
///////////// [2] function when click on btn submit ////////////////////
btnSubmit.addEventListener("click", () => {
  if (input.value == "") {
    window.alert("Please Enter Task Name");
  } else {
    addTaskToArray(input.value);
    input.value = "";
    addTaskToPage(tasksArray);
    addTaskToLocal(tasksArray);
  }
});
/////////////////////////////////////////////////////////////////////////
///////////// [3] function add task to array of tasks ////////////////////
function addTaskToArray(taskName) {
  const task = {
    id: Date.now(),
    title: taskName,
    completed: false,
  };
  tasksArray.push(task);
  // console.log(tasksArray);
}
/////////////////////////////////////////////////////////////////////////
///////////// [4] function add the array of tasks to page ////////////////////
function addTaskToPage(tasksArray) {
  tasksDiv.innerHTML = "";
  tasksArray.forEach((task) => {
    let taskTag = document.createElement("div");
    taskTag.appendChild(document.createTextNode(task.title));
    taskTag.classList.add("task");
    if (task.completed) {
      taskTag.classList.add("done");
    }
    taskTag.setAttribute("data-id", task.id);
    let delSpan = document.createElement("span");
    delSpan.classList.add("delete");
    delSpan.appendChild(document.createTextNode("X"));
    taskTag.appendChild(delSpan);
    tasksDiv.appendChild(taskTag);
  });
}
/////////////////////////////////////////////////////////////////////////
///////////// [5] function add task to local storage ////////////////////
function addTaskToLocal(tasksArray) {
  window.localStorage.setItem("task", JSON.stringify(tasksArray));
}
/////////////////////////////////////////////////////////////////////////
///////////// [6] function get task from local storage ////////////////////
function getTaskFormLocal() {
  let data = window.localStorage.getItem("task");
  if (data) {
    let tasks = JSON.parse(data);
    // console.log(tasks);
    tasksArray = tasks;
    addTaskToPage(tasksArray);
    // tasks.forEach((task) => {
    //   tasksArray.push(task);
    // });
  }
}
/////////////////////////////////////////////////////////////////////////
///////////// [7] function when click on the task  delete span or not that mean task is done ////////////////////
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // console.log(e.target.parentElement);
    e.target.parentElement.remove(); ///remove form page but not from local
    deleteTaskFromLocal(e.target.parentElement.getAttribute("data-id")); ///remove form  local
    // console.log(e.target.parentElement.getAttribute("data-id"));
  } else if (e.target.classList.contains("task")) {
    e.target.classList.add("done");
    tasksArray.map((task) => {
      if (task.id == e.target.getAttribute("data-id")) {
        return (task.completed = true);
      }
      return task;
    });
  }
  addTaskToLocal(tasksArray);
  // console.log(tasksArray);
});
/////////////////////////////////////////////////////////////////////////
///////////// [8] function remove from local storage ////////////////////
function deleteTaskFromLocal(tid) {
  tasksArray = tasksArray.filter(function (task) {
    return task.id != tid;
  });
  addTaskToLocal(tasksArray);
}
/////////////////////////////////////////////////////////////////////////
