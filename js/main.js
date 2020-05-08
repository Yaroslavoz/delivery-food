'use strict'

const cartButton = document.querySelector("#cart-button")
const modal = document.querySelector(".modal")
const close = document.querySelector(".close")
const buttonAuth = document.querySelector('.button-auth')
const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const loginForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login')
const userName = document.querySelector('.user-name')
const buttonOut = document.querySelector('.button-out')
const fillIt = document.querySelector('#attantion')
const cardsRestaurants = document.querySelector('.cards-restaurants')
const containerPromo = document.querySelector('.container-promo')
const restaurants = document.querySelector('.restaurants')
const menu = document.querySelector('.menu')
const logo = document.querySelector('.logo')
const cardsMenu = document.querySelector('.cards-menu')

let logined = localStorage.getItem('gloDelivery')

const toogleAuth = ()=> {
  modalAuth.classList.toggle('is-open')
}
function toggleModal() {
  modal.classList.toggle("is-open")
}

const authorized = () => {
  const logOut = () => {
    logined = null
    //localStorage.removeItem('gloDelivery')
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
  userName.style.color = 'white'
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
    fillIt.style.display = 'none'
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

const createCardRestaurants = () => {
  const card = `
      <a class="card card-restaurant">
        <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">Тануки</h3>
            <span class="card-tag tag">60 мин</span>
          </div>
          <div class="card-info">
            <div class="rating">
              4.5
            </div>
            <div class="price">От 1 200 ₽</div>
            <div class="category">Суши, роллы</div>
          </div>
        </div>
      </a>
    `
    cardsRestaurants.insertAdjacentHTML('beforeend', card)
}

const createCardGood = () => {
  const card = document.createElement('div')
  card.className = 'card'
  card.insertAdjacentHTML('beforeend',  `
    <img src="img/pizza-plus/pizza-girls.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">Пицца Девичник</h3>
      </div>
      
      <div class="card-info">
        <div class="ingredients">Соус томатный, постное тесто, нежирный сыр, кукуруза, лук, маслины,
                                  грибы, помидоры, болгарский перец.
        </div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">450 ₽</strong>
      </div>
    </div> 
  `)
  cardsMenu.insertAdjacentElement('beforeend' ,card)
}

const openGoods = (event) => {
  if (logined){const target = event.target
    const restaurant = target.closest('.card-restaurant')
    if (restaurant){
      cardsMenu.textContent = ''
      containerPromo.classList.add('hide')
      restaurants.classList.add('hide')
      menu.classList.remove('hide')
      createCardGood()
      createCardGood()
      createCardGood()
      createCardGood()
    }
  } else {
    toogleAuth()
    const logIn = (event) => {
      event.preventDefault()
      
      logined = loginInput.value
      if (logined) {
      toogleAuth()
      console.log(logined)
      fillIt.style.display = 'none'
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
  }
  
    
}



cartButton.addEventListener("click", toggleModal)

close.addEventListener("click", toggleModal)

cardsRestaurants.addEventListener('click', openGoods)

logo.addEventListener('click', () => {
  containerPromo.classList.remove('hide')
    restaurants.classList.remove('hide')
    menu.classList.add('hide')
})

checkAuth();
createCardRestaurants()