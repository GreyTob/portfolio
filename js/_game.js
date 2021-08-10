const timeTitle = document.querySelector('#timeTitle')
const timeList = document.querySelector('.time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const total = document.querySelector('#total')
const gameReboot = document.querySelector('#gameReboot')
const theBest = document.querySelector('.theBest')
let interval = null

//Скрыть лишние елементы во время игры и вернуть их после окончания
const boardTitle = document.querySelector('#board h2')
const arrowLeft = document.querySelector('#arrowLeft')
const arrowRight = document.querySelector('#arrowRight')
const dots = document.querySelector('.dots')
const controls = document.querySelector('.controls')
const mSlide = document.querySelector('.main-slide')
const sideBar = document.querySelector('.sidebar')

//Цвета circle
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

/**
 * Функция запускает игру
 */
function startGame() {
  //запрещаем перелистывание слайдов страницы words касанием пальцев
  document
    .querySelector('.works')
    .removeEventListener('touchstart', handleTouchStart, false)
  document
    .querySelector('.works')
    .removeEventListener('touchmove', handleTouchMove, false)

  //запускаем таймер
  interval = setInterval(decreseTime, 1000)

  createRandomCircle()
  setTime(time)

  //Скрываем мещающие игре елементы
  timeTitle.classList.remove('hide')
  boardTitle.classList.add('hide')
  timeList.classList.add('hide')
  arrowLeft.classList.add('hide')
  arrowRight.classList.add('hide')
  dots.classList.add('hide')
  controls.classList.add('hide')
  //А после проигрывания анимации убираем мещаюшие елементы совсем
  setTimeout(() => {
    arrowLeft.style.display = 'none'
    arrowRight.style.display = 'none'
    dots.style.display = 'none'
    controls.style.display = 'none'
    timeList.style.display = 'none'
    gameReboot.style.display = 'none'
  }, 300)

  //устанавлеваем поле для игры на весь экран
  mSlide.style.width = '100%'
  mSlide.style.left = 0
  sideBar.style.width = 0
}

/**
 * Функция вычитает единицу из переменной time, пока она не станет равной 0
 */
function decreseTime() {
  if (time === 0) {
    clearInterval(interval)
    finishGame()
  } else {
    --time
    setTime(time)
  }
}

/**
 * Функция устанавливает внешний вид отображения оставшегося времени игры и добавляет содержимое на страницу
 * @param {string} value оставшееся время игры
 */
function setTime(value) {
  if (value == '60') {
    timeEl.innerHTML = `01:00`
  } else if (value < 10) {
    timeEl.innerHTML = `00:0${value}`
  } else timeEl.innerHTML = `00:${value}`
}

/**
 * Функция останавливает  игру при окончании таймера, выводит результат на экран и возвращает скрытые элементы
 */
function finishGame() {
  total.innerHTML = `Cчет: <span class='primary'>${score}</span>`
  total.classList.remove('hide')
  gameReboot.classList.remove('hide')
  timeTitle.classList.add('hide')
  document.querySelector('.circle').remove()

  //возвращаем все как было до начала игры
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

  //Возвращаем возможность перелистывания слайдов страницы words касанием пальцев
  document
    .querySelector('.works')
    .addEventListener('touchstart', handleTouchStart, false)

  document
    .querySelector('.works')
    .addEventListener('touchmove', handleTouchMove, false)
}

/**
 * Функция определяет лучший результат в игру
 * До начала первой игры лучший результат не отображается
 */
function bestOfScore() {
  if (score > bestScore) bestScore = score
  theBest.classList.remove('hide')
  theBest.textContent = `Твой лучший результат: ${bestScore}`
}
/**
 * Функция предлагает заново выбрать время игры
 */
function restartGame() {
  time = 0
  score = 0

  total.classList.add('hide')
  timeTitle.classList.add('hide')
  boardTitle.classList.remove('hide')
  timeList.classList.remove('hide')
  gameReboot.classList.add('hide')
}

/**
 *  Функция возвращает один случайный цвет из массива цветов
 * @param {array} colorArray массив цветов
 * @returns Случайный цвет
 */
function setColorCircle(colorArray) {
  return circleColor[Math.floor(Math.random() * colorArray.length)]
}

/**
 * Функция создает элемент circle, задает его размер, цвет и размещает в случайном месте игровой доски
 */
function createRandomCircle() {
  //создаем и добавляем элемент circle на игровую доску
  const circle = document.createElement('div')
  circle.classList.add('circle')

  //задаем цвет circle
  circle.style.background = setColorCircle(circleColor)

  //задаем размер circle
  const size = getRandonNumber(20, 60)

  //задаем случйные координаты для размещения circle, учитывает его собственный размер (чтобы circle всегда полностью помещался на игровую доску)
  const { width, height } = board.getBoundingClientRect()
  let x = getRandonNumber(0, width - size)
  let y = getRandonNumber(0, height - size)
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`

  //добавляем circle на игровую доску
  board.append(circle)
}

/**
 * Функциягенерирует случайное целое  число от min до max (включительно)
 * @param {number} min
 * @param {number} max
 * @returns случайное число
 */
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

//Выбор времени игры и запуск
timeList.addEventListener('click', (event) => {
  //наследование
  if (event.target.classList.contains('time-btn')) {
    time = +event.target.getAttribute('data-time')
    startGame()
  }
})

//добавлие очков при клике на circle, удаление и создание нового circle
board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

//Событие кнопки перезапуска игры
gameReboot.addEventListener('click', restartGame)
