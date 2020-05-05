const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//day1
let logined = localStorage.getItem('gloDelivery')
const buttonAuth = document.querySelector('.button-auth')
const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const loginForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login')
const userName = document.querySelector('.user-name')
const buttonOut = document.querySelector('.button-out')
const fillIt = document.querySelector('#attantion')
const toogleAuth = ()=> {
  modalAuth.classList.toggle('is-open')
}


const authorized = () => {
  const logOut = () => {
    logined = null
    localStorage.removeItem('gloDelivery')
    buttonAuth.style.display = ''
    userName.style.display = ''
    buttonOut.style.display = ''
    buttonOut.removeEventListener('click', logOut)
    checkAuth()
  }
  console.log('Authorized');
  userName.textContent = logined;
  
  buttonAuth.style.display = 'none'
  userName.style.display = 'inline'
  buttonOut.style.display = 'block'

  buttonOut.addEventListener('click', logOut)

  
  
}
const notAuthorized = () => {
  console.log('Not authorized');
  
  const logIn = (event) => {
    event.preventDefault()
    
    logined = loginInput.value
    if (logined) {
    toogleAuth()
    console.log(logined)
    localStorage.setItem('gloDelivery', logined)
    buttonAuth.removeEventListener('click', toogleAuth)
    closeAuth.removeEventListener('click', toogleAuth)
    loginForm.removeEventListener('submit', logIn)
    loginForm.reset()
    checkAuth()
    } else {
    fillIt.style.display = 'block'
    }
  }
  buttonAuth.addEventListener('click', toogleAuth)
  closeAuth.addEventListener('click', toogleAuth)
  loginForm.addEventListener('submit', logIn)
}


const checkAuth = () =>  {
    logined ? authorized() : notAuthorized()
  }
checkAuth();
