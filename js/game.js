const timeTitle = document.querySelector('#timeTitle')
const timeList = document.querySelector('.time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const boardTitle = document.querySelector('#board h2')
const total = document.querySelector('#total')
const gameReboot = document.querySelector('#gameReboot')
let interval = null

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
  interval = setInterval(decreseTime, 1000)

  createRandomCircle()
  setTime(time)
  timeTitle.classList.remove('hide')
  boardTitle.classList.add('hide')
  timeList.classList.add('hide')
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

  gameReboot.addEventListener('click', restartGame)
}

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

  const size = getRandonNumber(10, 60)
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

//автомато набирать очки
// function winTheGame() {
//   function killCircle() {
//     const circle = document.querySelector('.circle')
//     if (circle) {
//       circle.click()
//     }
//   }
//   setInterval(killCircle, 45)
// }
