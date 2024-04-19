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
  function taskLi(){
    for (let i = 0; i < tasks.length; i++){
        taskList.innerHTML += 
            `<li>
                <input type="checkbox" name="" id="" value="${tasks[i].completed}">
                ${tasks[i].name}
            </li>`;
    };
  };


  taskLi();


//event que dice si el check es === true -> añadir clase .add, si check es === false -> .remove clase  

function handleCheck(){

    for (let i = 0; i < tasks.length; i++){
        const checkValue = tasks[i].completed;
        console.log(checkValue);

        if (checkValue === true){
            //averiguar como dar clase a li
        } else if(checkValue === false){

        };
    };
};

handleCheck();

//crear addEventListener sobre los checkbox


