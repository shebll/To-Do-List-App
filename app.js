////////////////// [1] select element form HTML //////////////////////////
let input = document.querySelector(".container .form .input");
let btnSubmit = document.querySelector(".container .form .add");
let tasksDiv = document.querySelector(".container .tasks ");
let tasksArray = [];
/////////////////////////////////////////////////////////////////////////
///////////// [2] function when click on btn submit ////////////////////
btnSubmit.addEventListener("click", () => {
  if (input.value == "") {
    window.alert("Please Enter Task Name");
  } else {
    addTaskToArray(input.value);
    input.value = "";
    addTaskToPage(tasksArray);
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
  console.log(tasksArray);
}
/////////////////////////////////////////////////////////////////////////
///////////// [4] function add the array of tasks to page ////////////////////
function addTaskToPage(tasksArray) {
  tasksDiv.innerHTML = "";
  tasksArray.forEach((task) => {
    let taskTag = document.createElement("div");
    taskTag.appendChild(document.createTextNode(task.title));
    taskTag.classList.add("task");
    taskTag.setAttribute("data-id", task.id);
    tasksDiv.appendChild(taskTag);
  });
}
/////////////////////////////////////////////////////////////////////////
