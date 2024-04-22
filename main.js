"use strict";

const taskList = document.querySelector(".js-task-list");


//array donde irán las tareas
const tasks = [
    { 
        name: 'Recoger setas en el campo', 
        completed: true 
    },
    { 
        name: 'Comprar pilas', 
        completed: true 
    },
    { 
        name: 'Poner una lavadora de blancos', 
        completed: true 
    },
    {
        name: 'Aprender cómo se realizan las peticiones al servidor en JavaScript',
        completed: false,
    },
  ];

  //Pintar en html lista de tasks
function taskLi(task){
    let classTachado = "";
    let checked = "";
    if (task.completed === true){
      classTachado = 'tachado';
      checked = "checked";
    };
    return `<li class=${classTachado}>
    <input type="checkbox" name="" id="" value="${task.completed}" ${checked}> ${task.name}
    </li>`
  };




//event que dice si el check es === true -> añadir clase .add, si check es === false -> .remove clase  

function handleCheck(){

    for (let i = 0; i < tasks.length; i++){
        const checkValue = tasks[i].completed;
        console.log(checkValue);
        taskList.innerHTML += taskLi(tasks[i]);
       
    };
};


handleCheck();



//crear addEventListener sobre los checkbox


