let allTasks = [];
function Tasks(
  taskName,
  taskTime,
  taskDate,
  taskNote,
  isImportant,
  taskState = true
) {
  this.taskName = taskName;
  this.taskTime = taskTime;
  this.taskDate = taskDate;
  this.taskNote = taskNote;
  this.isImportant = isImportant;
  this.taskState = taskState;

  allTasks.push(this);
  this.render();
}

Tasks.prototype.render = function () {
  let index = allTasks.length - 1;
  let listDiv = document.getElementsByClassName("list-div")[0];
  let div = document.createElement("div");

  let img = document.createElement("img");
  img.className = "taskState";
  img.setAttribute("onclick", `changeState(${index})`);
  div.appendChild(img);

  if (this.taskState) {
    img.setAttribute("src", "img/green-circle.png");
    div.style.border = "1px solid green";
    div.style.opacity = "1";
  } else {
    img.setAttribute("src", "img/red-circle.png");
    div.style.border = "1px solid red";
    div.style.opacity = "0.5";
  }

  if (this.isImportant) {
    img = document.createElement("img");
    img.className = "isImportant";
    img.setAttribute("src", "img/alert.png");
    div.appendChild(img);
  }

  let h2 = document.createElement("h2");
  h2.textContent = this.taskName;
  h2.className = "title";
  div.appendChild(h2);

  img = document.createElement("img");
  img.className = "taskRemove";
  img.setAttribute("src", "img/red-x-line.png");
  img.setAttribute("onclick", `removeItem(${index})`);

  div.appendChild(img);

  let p = document.createElement("p");
  let span = document.createElement("span");
  p.textContent = "Date : ";
  span.textContent = this.taskDate;
  span.className = "date";
  p.appendChild(span);
  div.appendChild(p);
  listDiv.appendChild(div);

  p = document.createElement("p");
  span = document.createElement("span");
  p.textContent = "Time : ";
  span.textContent = this.taskTime;
  span.className = "time";
  p.appendChild(span);
  div.appendChild(p);
  listDiv.appendChild(div);

  p = document.createElement("p");
  span = document.createElement("span");
  p.textContent = "Note : ";
  span.textContent = this.taskNote;
  span.className = "note";
  p.appendChild(span);
  div.appendChild(p);
  listDiv.appendChild(div);
};

function setLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}
function getLocalStorage() {
  let data = JSON.parse(localStorage.getItem("tasks"));
  allTasks = [];
  document.getElementsByClassName("list-div")[0].textContent = "";
  if (data != null) {
    for (let i = 0; i < data.length; i++) {
      new Tasks(
        data[i].taskName,
        data[i].taskTime,
        data[i].taskDate,
        data[i].taskNote,
        data[i].isImportant,
        data[i].taskState
      );
    }
  }
}

function removeItem(index) {
  allTasks.splice(index, 1);
  setLocalStorage();
  getLocalStorage();
}

function changeState(index) {
  if (allTasks[index].taskState) {
    allTasks[index].taskState = false;
  } else {
    allTasks[index].taskState = true;
  }
  setLocalStorage();
  getLocalStorage();
}

document.getElementById("toDoForm").addEventListener("submit", handelForm);
/**
 *
 * @param {event} e
 */

function handelForm(e) {
  e.preventDefault();
  let taskName = e.target.taskName.value;
  let taskTime = e.target.taskTime.value;
  let taskDate = e.target.taskDate.value;
  let taskNote = e.target.taskNote.value;
  let isImportant = e.target.isImportant.checked;
  new Tasks(taskName, taskTime, taskDate, taskNote, isImportant);
  setLocalStorage();
}

getLocalStorage();
