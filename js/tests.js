    //Make business tests.
    //q: When do these tests get used?
    //a: When the user clicks on the button 'business tests'.
    function businessTests() {
        const doneTasks = document.getElementById('done-tasks').childNodes;
        const todoTasks = document.getElementById('todo-tasks').childNodes;
        const doingTasks = document.getElementById('inprogress-tasks').childNodes;

        if (doneTasks.length === 0) {
            alert("You didn't complete any tasks yet!");
        } 
        else if (todoTasks.length > 0 || doingTasks.length > 0) {
            alert("You didn't complete all tasks yet!");
        } 
        else {
            alert('You completed all tasks!');
        }
    }