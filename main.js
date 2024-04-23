"use strict";

const taskList = document.querySelector(".js-task-list");


//array donde irán las tareas
const tasks = [
    { 
        name: 'Recoger setas en el campo', 
        completed: true, 
        id: 1,
    },
    { 
        name: 'Comprar pilas', 
        completed: true,
        id: 2,
    },
    { 
        name: 'Poner una lavadora de blancos', 
        completed: true,
        id: 3,
    },
    {
        name: 'Aprender cómo se realizan las peticiones al servidor en JavaScript',
        completed: false,
        id: 4,
    },
  ];

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

    //Pintar en html lista de tasks
    for (let i = 0; i < tasks.length; i++){
        const checkValue = tasks[i].completed;
        console.log(checkValue);
        taskList.innerHTML += taskLi(tasks[i]); 
    };
};


handleCheck();


//función que cambie el tasks.checked completed/not completed 
function handleClick(event){
    const taskID = event.target.id;
    const taskIndex = tasks.findIndex(task => task.id === parseInt(taskID));
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    console.log(tasks[taskIndex].completed);
    
    //el target hace referencia al elemento que ha sido pulsado, en este caso un input check que está dentro de cada li. por eso event.target obtengo ese check y event.target.parentElement es la manera de acceder a su padre que es el li.
    const taskLiElement = event.target.parentElement;
    //hacemos el toggle con la clase tachado para que se la ponga y se la quite al li.
    taskLiElement.classList.toggle('tachado');
};

//obtenemos el listado con todos los cuadraditos del check
const clickCheck = document.querySelectorAll(".js-checkbox");
//crear addEventListener sobre los checkbox
//bucle array checkboxes
for(const eachCheckBox of clickCheck){
    eachCheckBox.addEventListener('click', handleClick)
};   



