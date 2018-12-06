const scoreBoard = document.querySelector('#scoreboard')

const fetchUsers = () =>
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())

const fetchScores = () =>
    fetch('http://localhost:3000/api/v1/scores')
    .then(resp => resp.json())

const postUser = (user) => {
    fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

}


const renderTable = () => {
    const table = document.createElement('table')
    table.className = 'table'
    table.id = 'table'
    table.innerHTML = `
    
    <thead>
        <tr>
        <th scope="col">Username</th>
        <th scope="col">Score</th>
        </tr>
    </thead>
    `
    scoreBoard.appendChild(table)
}

const renderRows = (scoreBoard) => {
    for (const user in scoreBoard) {
        renderRow(user, scoreBoard)
    }
}

const renderRow = (user, scoreBoard) => {
        const tableBody = document.createElement('tbody')
        tableBody.innerHTML =
            `
        <tr>
            <td>${user}</td>
            <td>${scoreBoard[user]}</td>
        </tr>
    `
    const table = document.querySelector('#table')
    table.appendChild(tableBody)
}




const sortByScores = (scores) => {
    const scoreBoard = {}

    let sortedScores = scores.sort(function(a,b) {
        return b.points - a.points
    })
    sortedScores.forEach(score => {
        let username = score.users[0].username
        if (!scoreBoard[username]) {
            scoreBoard[username] = score.points
        } else if (scoreBoard[username] && score.points > scoreBoard[username]) {
            scoreBoard[username] = score.points
        }
    })
    renderRows(scoreBoard)
}

renderTable()
fetchScores()
    .then(sortByScores)