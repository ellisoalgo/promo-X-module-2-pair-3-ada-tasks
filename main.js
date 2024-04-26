"use strict";

const taskList = document.querySelector(".js-task-list");


//array donde irán las tareas
let tasks = [];

//Guardar una versión de la API en nuestro usuario de github.
const GITHUB_USER = 'luciadelafuente';
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;

//llamada al servidor de la API.
localStorage.setItem("tasks");
const tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));
if (tasksLocalStorage !== null) {
    // si (existe el listado de tareas en Local Storage)
    // pinta la lista de tareas almacenadas en tasksLocalStorage
    
    tasksLocalStorage();
  } else {
    //sino existe el listado de tareas en el local storage
    // pide los datos al servidor
    fetch(SERVER_URL)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    tasks = data.results;
    handleCheck();
    console.log(taskList);
    console.log(tasks);
    console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
  };

//Guarda la respuesta obtenida enla variable para el listado de tareas: `tasks`

//event que dice si el check es === true -> añadir clase .add, si check es === false -> .remove clase 

//clase tachado  
function taskLi(task){
    let classTachado = "";
    let checked = "";
    if (task.completed === true){
      classTachado = 'tachado';
      checked = "checked";
    } else{
        classTachado = "";
        checked = "";
    };
    return `<li class=${classTachado}>
    <input type="checkbox" name="" id="${task.id}" value="${task.completed}" ${checked} class="js-checkbox"> ${task.name}
    </li>`
  };


function handleCheck(){
    //ponemos la ul en vacío para que no se nos repitan las listas
    taskList.innerHTML = "";
    //Pintar en html lista de tasks
    for (let i = 0; i < tasks.length; i++){
        const checkValue = tasks[i].completed;
        console.log(checkValue);
        taskList.innerHTML += taskLi(tasks[i]); 
    };
    counter();
};

//función que cambie el tasks.checked completed/not completed 
function handleClick2(event){
    const taskID = event.target.id;
    const taskIndex = tasks.findIndex(task => task.id === parseInt(taskID));
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    console.log(tasks[taskIndex].completed);
    
    //el target hace referencia al elemento que ha sido pulsado, en este caso un input check que está dentro de cada li. por eso event.target obtengo ese check y event.target.parentElement es la manera de acceder a su padre que es el li.
    const taskLiElement = event.target.parentElement;
    //hacemos el toggle con la clase tachado para que se la ponga y se la quite al li.
    taskLiElement.classList.toggle('tachado');
    counterText.innerHTML  = '';
    counter();
};

// function handleClick(event){
//     const taskID = event.target.id;
//     const taskIndex = tasks.findIndex(task => task.id === parseInt(taskID));
//     tasks[taskIndex].completed = !tasks[taskIndex].completed;
//     console.log(tasks[taskIndex].completed);
//     //añadimos aquí a handleCheck, estabamos llamando a la función taskLi y no nos funcionaba porque esa función es llamada en handleCheck y hay que llamar a handleCheck.
//     handleCheck();
// };

//este for es el que nos molestaba, no había que usarlo y simplemente llamar sobre el ul al eventListener y llamar a handleClick
//obtenemos el listado con todos los cuadraditos del check
// const clickCheck = document.querySelectorAll(".js-checkbox");
//bucle array checkboxes
// for(const eachCheckBox of clickCheck){
//     eachCheckBox.addEventListener('click', handleClick)
// };   
//crear addEventListener sobre los checkbox
taskList.addEventListener('click', handleClick2);

// si ves hay dos funciones, una handleClick y otra handleClick2 son dos maneras distintas de resolver lo mismo, nos quedamos con la que quieras, la que llamemos en la línea 94 es la que se ejecuta, la otra no está llamada. 

/* 
    Filtrar tareas:
    1.- Evento sobre botón buscar
    2.- Función handle:
        1) obtener valor input
        2) filter de listado de tareas
        3) volver a pintar tareas filtradas
*/

const input = document.querySelector(".js-text-task-filter");
const btnFilter = document.querySelector(".js-btn-filter");


function handleFilter(event){
    event.preventDefault();
    const filterTask = input.value;
    taskList.innerHTML = "";
    
    function searchResult (arr, value){
        return arr.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    }
    const result = searchResult(tasks, filterTask);
    console.log(result);

    for (const eachResult of result){
       taskList.innerHTML += taskLi(eachResult);
    };
};

btnFilter.addEventListener('click', handleFilter);

// let counterTasks = 0;
// let counterCompletedTasks = 0;
// let counterNotCompletedTasks = 0;
const div = document.querySelector('.div');

const counterText = document.querySelector(".counter");

function counter(){
    let counterTasks = tasks.length;
    const completedTasks = tasks.filter((tasks) => tasks.completed === true);
    let counterCompletedTasks = completedTasks.length;
    const notCompletedTasks = tasks.filter((tasks) => tasks.completed === false);
    let counterNotCompletedTasks = notCompletedTasks.length;
    counterText.innerHTML = `Tienes ${counterTasks} tareas. ${counterCompletedTasks} completadas y ${counterNotCompletedTasks} por realizar.`;
    console.log(counterTasks);
    console.log(counterCompletedTasks);
    console.log(counterNotCompletedTasks);
};

const btnAdd = document.querySelector(".js-btn-add");
const inputTarea = document.querySelector(".js-text-task-add");

//añadir nueva tarea
const handleNewTask = (event) => {
    event.preventDefault();
    // 1. Recoge el nombre de la tarea
    const valueInput = inputTarea.value;
    // 2. Crea un objeto para la nueva tarea
    const newTask = {
      name: `${valueInput}`, // sustituye este string vacío por el nombre de la tarea nueva
      completed: false,
      id: tasks[tasks.length-1].id+1,
    };   
  
    // 3. Añade la nueva tarea al array de tareas
    tasks.push(newTask);
  
    // 4. Vuelve a pintar las tareas
    handleCheck();
};

btnAdd.addEventListener('click', handleNewTask);



