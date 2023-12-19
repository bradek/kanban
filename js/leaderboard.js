function loadScores() {
    const scores = JSON.parse(localStorage.getItem('scores'));
    scores.sort(function(a, b) {
        return b.score - a.score;
    });

    if (scores) {
        let counter = 1;
        const scoreList = document.getElementById('score-list');
        scoreList.innerHTML = '';

        // Create table
        const table = document.createElement('table');
        table.classList.add('leaderboard-table'); // Add the class here
        scoreList.appendChild(table);

        // Create table header
        const thead = document.createElement('thead');
        table.appendChild(thead);
        const headerRow = document.createElement('tr');
        thead.appendChild(headerRow);
        const headers = ['Ranking', 'Name', 'Score'];
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        // Create table body
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        scores.forEach(score => {
            const scoreRow = document.createElement('tr');
            tbody.appendChild(scoreRow);

            const rankingCell = document.createElement('td');
            rankingCell.textContent = counter;
            scoreRow.appendChild(rankingCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = score.name;
            scoreRow.appendChild(nameCell);

            const scoreCell = document.createElement('td');
            scoreCell.textContent = score.score;
            scoreRow.appendChild(scoreCell);

            counter++;
        });
    }
}
