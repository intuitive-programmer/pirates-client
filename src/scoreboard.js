
// APIs
const fetchUsers = () =>
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())

const fetchScores = () =>
    fetch('http://localhost:3000/api/v1/scores')
    .then(resp => resp.json())

const postUser = (user) => 
    fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

const postScore = (score) =>
    fetch('http://localhost:3000/api/v1/scores', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(score)
    })

const postUserScore = (data) =>
    fetch('http://localhost:3000/api/v1/userscores', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })



const scoreBoard = document.querySelector('#scoreboard')
let CURRENTSCORE = 0

const renderForm = () => {
    const scoreForm = document.createElement('div')
    scoreForm.id = 'scoreForm'

    const scoreFormContent = document.createElement('h3')
    scoreFormContent.innerHTML = `Final score: ${CURRENTSCORE}`

    const cardForm = document.createElement('form')
    cardForm.id = 'cardForm'
    cardForm.innerHTML = `
        <div class="form-group">
            <label for="inputName" class="sr-only">Name</label>
            <input type="text" class="form-control" id="inputName" placeholder="Name">
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
    `

    cardForm.addEventListener('submit', event => {
        event.preventDefault()

        nameInput = cardForm.querySelector('input')
        user = {
            username: nameInput.value,
        }
        postUser(user)
            .then(resp => resp.json())
            .then(createScore)

    })

    const createScore = (user) => {
        const score = {
            points: CURRENTSCORE
        }
        postScore(score)
            .then(resp => resp.json())
            .then(score => createRelation(score, user))
    }

    const createRelation = (score, user) => {
        const data = {
            user_id: user.id,
            score_id: score.id
        }
        postUserScore(data)
            .then(resp => resp.json())
            .then(() => renderScoreBoard())
    }

    scoreForm.appendChild(scoreFormContent)
    scoreForm.appendChild(cardForm)
    scoreBoard.appendChild(scoreForm)
}

const clearScoreBoard = () => {
    scoreBoard.innerHTML = ''
}


const renderTable = () => {
    const table = document.createElement('table')
    table.className = 'table flexItem'
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

const renderScoreBoard = () => {
    clearScoreBoard()
    renderTable()
    fetchScores()
        .then(sortByScores)
}

