const timeTitle = document.querySelector('#timeTitle')
const timeList = document.querySelector('.time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const total = document.querySelector('#total')
const gameReboot = document.querySelector('#gameReboot')
let interval = null

//hide
const boardTitle = document.querySelector('#board h2')
const arrowLeft = document.querySelector('#arrowLeft')
const arrowRight = document.querySelector('#arrowRight')
const dots = document.querySelector('.dots')
const controls = document.querySelector('.controls')
const mSlide = document.querySelector('.main-slide')
const sideBar = document.querySelector('.sidebar')

const circleColor = [
  '#e5194a',
  '#fdd816',
  '#3baa36',
  '#32bce9',
  '#e0dbc5',
  '#fbf0a3',
]

let time = 0
let score = 0
let bestScore = 0

timeList.addEventListener('click', (event) => {
  //наследование
  if (event.target.classList.contains('time-btn')) {
    time = +event.target.getAttribute('data-time')
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  //запрещаю перелистывание слайдов страницы words
  document
    .querySelector('.works')
    .removeEventListener('touchstart', handleTouchStart, false)
  document
    .querySelector('.works')
    .removeEventListener('touchmove', handleTouchMove, false)

  interval = setInterval(decreseTime, 1000)

  createRandomCircle()
  setTime(time)
  timeTitle.classList.remove('hide')
  boardTitle.classList.add('hide')
  timeList.classList.add('hide')
  arrowLeft.classList.add('hide')
  arrowRight.classList.add('hide')
  dots.classList.add('hide')
  controls.classList.add('hide')

  setTimeout(() => {
    arrowLeft.style.display = 'none'
    arrowRight.style.display = 'none'
    dots.style.display = 'none'
    controls.style.display = 'none'
    timeList.style.display = 'none'
    gameReboot.style.display = 'none'
  }, 300)

  mSlide.style.width = '100%'
  mSlide.style.left = '0'
  sideBar.style.width = 0
}

function decreseTime() {
  if (time === 0) {
    clearInterval(interval)
    finishGame()
  } else {
    let currentTime = --time
    if (currentTime < 10) {
      currentTime = `0${currentTime}`
    }
    setTime(currentTime)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  total.innerHTML = `Cчет: <span class='primary'>${score}</span>`
  total.classList.remove('hide')
  gameReboot.classList.remove('hide')
  timeTitle.classList.add('hide')
  document.querySelector('.circle').remove()

  arrowLeft.classList.remove('hide')
  arrowRight.classList.remove('hide')
  dots.classList.remove('hide')
  dots.style.transition = 'all 0.3s ease'
  controls.classList.remove('hide')

  setTimeout(() => {
    arrowLeft.style.display = 'block'
    arrowRight.style.display = 'block'
    dots.style.display = 'block'
    controls.style.display = 'block'
    timeList.style.display = 'block'
    gameReboot.style.display = 'block'
  }, 300)

  mSlide.style.width = '65%'
  mSlide.style.left = '35%'
  sideBar.style.width = '35%'

  bestOfScore()

  gameReboot.addEventListener('click', restartGame)
  document
    .querySelector('.works')
    .addEventListener('touchstart', handleTouchStart, false)

  document
    .querySelector('.works')
    .addEventListener('touchmove', handleTouchMove, false)
}

const theBest = document.querySelector('.theBest')
function bestOfScore() {
  if (score > bestScore) bestScore = score
  theBest.classList.remove('hide')
  theBest.textContent = `Твой лучший результат: ${bestScore}`
}
console.log(bestScore)

function restartGame() {
  time = Infinity
  score = 0
  total.classList.add('hide')
  timeTitle.classList.add('hide')
  boardTitle.classList.remove('hide')
  timeList.classList.remove('hide')
  gameReboot.classList.add('hide')
}

function setColorCircle() {
  return circleColor[Math.floor(Math.random() * circleColor.length)]
}

function createRandomCircle() {
  const circle = document.createElement('div')
  circle.classList.add('circle')

  circle.style.background = setColorCircle()

  const size = getRandonNumber(20, 60)
  const { width, height } = board.getBoundingClientRect()
  let x = getRandonNumber(0, width - size)
  let y = getRandonNumber(0, height - size)

  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  circle.style.width = `${size}px`
  circle.style.height = `${size}px`

  board.append(circle)
}

function getRandonNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

//автоматом набирать очки
// function winTheGame() {
//   function killCircle() {
//     const circle = document.querySelector('.circle')
//     if (circle) {
//       circle.click()
//     }
//   }
//   setInterval(killCircle, 45)
// }
