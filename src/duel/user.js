const baseURL = 'http://localhost:3000'

const usersAPI = new API(baseURL, 'api/v1/users')

const containerDiv = document.querySelector('#container')

const renderUserForm = () => {
  const userForm = document.createElement('form')
  userForm.id = 'user-form'
  containerDiv.appendChild(userForm)
  
  const usernameLabel = document.createElement('label')
  usernameLabel.htmlFor = 'username-input'
  usernameLabel.innerText = 'Username'
  
  const usernameInput = document.createElement('input')
  usernameInput.id = 'username-input'
  
  const loginBtn = document.createElement('button')
  loginBtn.className = 'btn btn-primary'
  loginBtn.id = 'login-btn'
  loginBtn.innerText = 'Log In'
  
  const signupBtn = document.createElement('button')
  signupBtn.className = 'btn btn-success'
  signupBtn.id = 'signup-btn'
  signupBtn.innerText = 'Sign Up'
  
  userForm.appendChild(usernameLabel)
  userForm.appendChild(usernameInput)
  userForm.appendChild(loginBtn)
  userForm.appendChild(signupBtn)

  loginBtn.addEventListener('click', event => {
    event.preventDefault()
    clickAndLogin(usernameInput)
  })

  signupBtn.addEventListener('click', event => {
    event.preventDefault()
    clickAndSignup(usernameInput)
  })
}

const clickAndSignup = (input) => {
  const userToCreate = {
    username: input.value
  }
  usersAPI.create(userToCreate)
    .then(newUser => {
      state.currentUser = newUser
      console.log(newUser)
      // startGame()
  })
}

const clickAndLogin = (input) => {
  usersAPI.all()
    .then(users => {
      currentUser = users.find(user => user.username === input.value)
      state.currentUser = currentUser
      console.log(currentUser)
      // startGame()
    })
}

renderUserForm()