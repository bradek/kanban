//I want to use the dragableTask variable for the targets (the tasks), I'll drag later on.
let draggableTask = null;
//A let variable for totalPoints.
let totalPoints = 0;

/*An allowDrop method with 'event'.
This method is made to allow dropping the tasks in another section.
the needed updates for the points will be done here as well by calling the right methods to do so.*/
function allowDrop(event) {
    event.preventDefault();
    
    const doneTasks = document.getElementById('done-tasks').childNodes;

    if (event.target.className === 'tasks') {
        if (!doneTasks.includes(draggableTask) && event.target.id !== 'done-tasks') {
            substractPoints(); // Subtract points if task dragged from 'done' to another section
        } 
        else if (doneTasks.includes(draggableTask) && event.target.id === 'done-tasks') {
            updatePoints(); // Update points if task was dragged back to 'done'
        }

        event.target.appendChild(draggableTask);
        saveTasks();
    }
}

//A drag method in which draggableTask is equal to event.target.
function drag(event) {
    draggableTask = event.target;
    /*I'm using the originalParent because the substraction of points didn't work when dragging a task from the 'done'
    section to another.*/
    originalParent = event.target.parentNode; // Store the original parent when a task is dragged
}

/*A drop method with 'event'.
If the event.target.classname is 'tasks', only then it gets appended.
This means the task is being added to the section.*/
function drop(event) {
    event.preventDefault();

    // Code to handle the task drop
    if (event.target.className === 'tasks') {
        event.target.appendChild(draggableTask);

        //If the event target id is 'done-tasks', then the updatePoints() method is being called.
        if (event.target.id === 'done-tasks') {
            updatePoints();
        }

        saveTasks();

        if (originalParent.id === 'done-tasks' && originalParent !== event.target) {
            substractPoints(); // Subtract points if the task is dropped in another section from 'done'
        }

        originalParent = null; // Reset original parent after drop
    }
}

    //A method to add a task.
    function addTask() {
        const taskInput = document.getElementById('taskInput').value;
        if (taskInput.trim() !== '') {
            const task = document.createElement('div');
            task.className = 'task';
            task.draggable = true;
            task.textContent = taskInput;
            task.addEventListener('dragstart', drag);
            document.getElementById('todo-tasks').appendChild(task);
            //The saveTasks() method is being called.
            saveTasks();
            document.getElementById('taskInput').value = '';
        } else {
            alert('Fill in a task!!');
        }
    }

    //A method to remove a task.
    function removeTask() {
        if (draggableTask) {
            const doneTasks = document.getElementById('done-tasks').childNodes;

            //If the event target is not anymore in 'done-tasks', 10 points get removed.
            if (doneTasks && doneTasks.length > 0 && doneTasks[doneTasks.length - 1] === draggableTask) {
                substractPoints(); // Subtract points if the removed task was from the 'done' section
            }

            draggableTask.remove();

            //The saveTasks() method is being called.
            saveTasks();
            draggableTask = null;
        } 
        else {
            alert('Select a task.');
        }
    }

    

    /*A method saveTasks which uses a constant columns which has a query selector using the html class .column.
    Also I want a const tasks = {};
    With a foreach loop there should be looped through the columns*/
    function saveTasks() {
        const columns = document.querySelectorAll('.column');
        const tasks = {};
        columns.forEach(column => {
            const columnId = column.id;
            const columnTasks = [];
            column.querySelectorAll('.task').forEach(task => {
                columnTasks.push(task.textContent);
            });
            tasks[columnId] = columnTasks;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /*A method loadTasks which uses a constant tasks = JSON.parse(localStorage.getItem('tasks'));
    This means this method is responsible for eventually loading and showing the earlier saved information.*/
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
    
        if (tasks) {
            Object.keys(tasks).forEach(columnId => {
                const column = document.getElementById(columnId);
    
                // Ensure the column exists
                if (column) {
                    const columnTasks = tasks[columnId];
    
                    // Add the tasks to the column
                    columnTasks.forEach(taskContent => {
                        const task = document.createElement('div');
                        task.className = 'task';
                        task.draggable = true;
                        task.textContent = taskContent;
                        task.addEventListener('dragstart', drag); // Reattach the drag event listener
                        column.querySelector('.tasks').appendChild(task); // Append to tasks container
                    });
                }
            });
            restorePoints();
        }
    }
    
    window.onload = function() {
        loadTasks();
    }

    /*The selectTask method and the addEventListener 'click' have been generated by ChatGPT 3.5*/
    /*The selectTask method should make sure the user can select a task.
    It gets a border so it's clear for the user what has been selected.
    This is practical for when a user would like to remove a task, so they are always aware which task is selected.*/
    function selectTask(task) {
        if (draggableTask) {
            draggableTask.style.border = 'none'; // Remove border from the previously selected task
        }
        draggableTask = task;
        draggableTask.style.border = '2px solid black'; // Add a red border to the selected task
    }

    /*The earlier made selectTask()-method will be activated when someone CLICKS on the task.
    For that I use an addEventListener 'click'.*/
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('task')) {
            selectTask(event.target);
        } else if (event.target.nodeName !== 'INPUT') {
            if (draggableTask) {
                draggableTask.style.border = 'none'; // Remove border if clicked outside of tasks
                draggableTask = null;
            }
        }

    });


    //A function 'toggleMode' which toggles the dark-mode class on the body element with a const body which uses a querySelector.
    function toggleMode() {
        const body = document.querySelector('body');
        body.classList.toggle('dark-mode');
    }

    //Make a function 'updatePoints' which updates the points.
    function updatePoints() {
        const doneTasks = document.getElementById('done-tasks').childNodes;
        totalPoints = 10 * doneTasks.length;
        savePoints(); // Save the updated points
        document.getElementById('point-counter').textContent = `Points: ${totalPoints}`;
    }
    
    //Make a function 'addPoints' which adds points.
    function addPoints() {
        totalPoints += 10;
        savePoints(); // Save the updated points
        document.getElementById('point-counter').textContent = `Points: ${totalPoints}`;
    }
    
    //Make a function 'substractPoints' which substracts points.
    function substractPoints() {
        totalPoints -= 10;
        savePoints(); // Save the updated points
        document.getElementById('point-counter').textContent = `Points: ${totalPoints}`;
    }
    
    /*The savePoints() method will save 'saved points' in localStorage.*/
    function savePoints() {
        localStorage.setItem('points', totalPoints);
    }
    
    //The restorePoints() method will restore the points from localStorage.
    function restorePoints() {
        const points = localStorage.getItem('points');
        if (points) {
            totalPoints = parseInt(points);
            document.getElementById('point-counter').textContent = `Points: ${totalPoints}`;
        }
    }