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
const sectionHeading = document.querySelector('.heading')

let logined = localStorage.getItem('gloDelivery')

const getData = async function(url)  {
  const response =await fetch(url)

  if(!response.ok) {
    throw new Error(`Custom error at address ${url}, error status ${response.status}!!`)
  }
  return response.json()
  
}

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

const createCardRestaurants = ({ image, name, time_of_delivery: timeOfDelivery, stars, price, kitchen, products }) => {
  
  const card = `
      <a class="card card-restaurant" data-products="${products}">
        <img src=${image} alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title" >${name}</h3>
            <span class="card-tag tag">${timeOfDelivery}</span>
          </div>
          <div class="card-info">
            <div class="rating">
              ${stars}
            </div>
            <div class="price">От ${price} ₽</div>
            <div class="category">${kitchen}</div>
          </div>
        </div>
      </a>
    `
    cardsRestaurants.insertAdjacentHTML('beforeend', card)
}

const createHeading = (it) => {
  
  const { name, stars, price, kitchen } = it
  console.log(it);
  // const head = document.createElement('div')
  // head.className = 'heading'
  
  const head = `
    <h2 class="section-title restaurant-title">${name}</h2>
    <div class="card-info">
      <div class="rating">
        ${stars}
      </div>
      <div class="price">От ${price} ₽</div>
      <div class="category">${kitchen}</div>
    </div>
  `
  sectionHeading.insertAdjacentHTML('beforeend' , head)
}

const createCardGood = ({ description, id, image, name, price }) => {
      
  const card = document.createElement('div')
  card.className = 'card'
  card.insertAdjacentHTML('beforeend',  `
    <img src="${image}" alt="${id}" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      
      <div class="card-info">
        <div class="ingredients">${description}
        </div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">${price} ₽</strong>
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
      getData(`../db/partners.json`).then((it)=>it.find((elem)=>elem.products === restaurant.dataset.products)).then((data) =>createHeading(data))
      getData(`../db/${restaurant.dataset.products}`).then((data)=>{data.map(createCardGood)
      })
      console.log(restaurant.dataset.products);
      
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

const init = () => {
  getData('../db/partners.json').then((data)=>{data.map(createCardRestaurants)
  })
  
  cartButton.addEventListener("click", toggleModal)
  
  close.addEventListener("click", toggleModal)
  
  cardsRestaurants.addEventListener('click', openGoods)
  
  logo.addEventListener('click', () => {
    containerPromo.classList.remove('hide')
      restaurants.classList.remove('hide')
      menu.classList.add('hide')
  })
  
  checkAuth();
}

init()


