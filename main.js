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
    //ponemos la ul en vacío para que no se nos repitan las listas
    taskList.innerHTML = "";
    //Pintar en html lista de tasks
    for (let i = 0; i < tasks.length; i++){
        const checkValue = tasks[i].completed;
        console.log(checkValue);
        taskList.innerHTML += taskLi(tasks[i]); 
    };
};


handleCheck();


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
