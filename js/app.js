const addbutton = document.getElementById("add");
const editbutton = document.getElementById("edit");
const taskinput = document.querySelector(".input");
const dateinput = document.querySelector(".inpu");
const alertdiv = document.getElementById("alertdiv");
const tbody = document.querySelector("tbody");
const delateall = document.getElementById("mar");
const thirbutton = document.querySelectorAll(".thirbutton");
// console.log(tbody);

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const idGnarator = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

const savelocalstorage = () => {
  const save = localStorage.setItem("todos", JSON.stringify(todos));
};

const addhandler = () => {
  const task = taskinput.value;
  const date = dateinput.value;
  const todo = {
    id: idGnarator(),
    task,
    date,
    complate: false,
  };
  if (task) {
    todos.push(todo);
    taskinput.value = "";
    dateinput.value = "";
    console.log(todos);
    savelocalstorage();
    displaytodos();
    showemassage("add is successfuly", "success");
  } else {
    showemassage("no add!", "error");
  }
};

const showemassage = (masaage, type) => {
  alertdiv.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = masaage;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertdiv.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const displaytodos = (date) => {
  const todolist = date || todos;
  tbody.innerHTML = "";
  if (!todolist.length) {
    tbody.innerHTML = "<tr><td colspan='4'>No task fund! </td></tr>";
    return;
  }
  todolist.forEach((todo) => {
    tbody.innerHTML += `
      <tr>
      <td>${todo.task}</td>
      <td>${todo.date || "No date"}</td>
      <td>${todo.complate ? "complate" : "pending"}</td>
      <td>
      <button onclick="edithandler('${todo.id}')">Edit</button>
      <button onclick="Dohandler('${todo.id}')">${
      todo.complate ? "Undo" : "Do"
    }</button>
      <button onclick="deletonetodo('${todo.id}')">Dlate</button>
      </td>
      
      
      </tr>
      `;
  });
};
const delateallhandler = () => {
  if (todos.length) {
    todos = [];
    savelocalstorage();
    displaytodos();
    showemassage("delet is successfuly", "success");
  } else {
    showemassage("no delate", "error");
  }
};
const deletonetodo = (id) => {
  const delet = todos.filter((todo) => todo.id !== id);
  todos = delet;
  savelocalstorage();
  displaytodos();
  showemassage("delet is successfuly", "success");
  console.log(delet);
};

const Dohandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  todo.complate = !todo.complate;
  savelocalstorage();
  displaytodos();
  showemassage("thas grate", "success");
};

const edithandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  taskinput.value = todo.task;
  dateinput.value = todo.date;
  addbutton.style.display = "none";
  editbutton.style.display = "inline-block";
  editbutton.dataset.id = id;
};

const aplly = (event) => {
  const id = event.target.dataset.id;
  const todo = todos.find((todo) => todo.id === id);
  todo.task = taskinput.value;
  todo.data = dateinput.value;
  taskinput.value = "";
  dateinput.value = "";
  addbutton.style.display = "inline-block";
  editbutton.style.display = "none";
  savelocalstorage();
  displaytodos();
  showemassage();
};

const filterhandler = (event) => {
  let liststor = null;
  const filter = event.target.dataset.filter;
  switch (filter) {
    case "Pending":
      liststor = todos.filter((todo) => todo.complate === false);
      break;
    case "complate":
      liststor = todos.filter((todo) => todo.complate === true);
    default:
      // liststor = todos;
      break;
  }
  displaytodos(liststor);
  console.log(liststor);
};
// filterhandler()

window.addEventListener("load", () => displaytodos());
addbutton.addEventListener("click", addhandler);
delateall.addEventListener("click", delateallhandler);
editbutton.addEventListener("click", aplly);
thirbutton.forEach((button) => {
  button.addEventListener("click", filterhandler);
});
