// A function that loads the scores from localstorage and displays them in the scoreboard
function loadScores() {
    const scores = JSON.parse(localStorage.getItem('scores'));
    console.log(scores);
    scores.sort(function(a,b){
        return b.score - a.score;
    })
    console.log(scores)
            
    if (scores) {
        let counter = 1;
        const scoreList = document.getElementById('score-list');
        scoreList.innerHTML = '';
        scores.forEach(score => {
            const scoreItem = document.createElement('li');
            scoreItem.textContent = `${counter}:    ${score.name}: ${score.score}`;
            scoreList.appendChild(scoreItem);
            counter++;
        });
    }
}