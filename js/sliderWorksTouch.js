let touchX = null
let touchY = null

/**
 * функция получает координаты точки касания события touchstart
 * @param {object} e интерфейс Event
 */

function handleTouchStart(e) {
  touchX = e.touches[0].clientX
  touchY = e.touches[0].clientY
}

/**
 * Функция определяет в какую сторону было совершено движение пальцем при событии touchmove.
 * Координаты движения события touchmove записываются в переменные touchXmove, touchНmove.
 * По модулю вычисляется разница координат событий touchstart  и touchmove. При divX > 0 движение совершается влево и происходит вызов функции changeSlide в коротую передается параметр 'up'. При divX < 0 движение совершается ввправо и просходит вызов функции changeSlide в коротую передается параметр 'down'. Переменная divY позволяет вычислить что движение было совершено именно в сторону а не вниз или вверх
 * координатам точки касания присваивается null
 * @param {object} e событие event
 * @returns {boolean} возвразает false если движения не было
 */
function handleTouchMove(e) {
  if (!touchX && touchY) {
    return false
  }

  let touchXmove = e.touches[0].clientX
  let touchYmove = e.touches[0].clientY

  let divX = touchX - touchXmove
  let divY = touchY - touchYmove

  if (Math.abs(divX) > Math.abs(divY)) {
    if (divX > 0) {
      changeSlide('up')
    } else changeSlide('down')
  }

  touchX = null
  touchY = null
}

document
  .querySelector('.works')
  .addEventListener('touchstart', handleTouchStart, false)

document
  .querySelector('.works')
  .addEventListener('touchmove', handleTouchMove, false)
