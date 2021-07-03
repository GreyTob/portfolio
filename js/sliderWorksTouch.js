let touchX = 0
let touchY = 0

/**
 * ффункция получает координаты точки касания
 * @param {object} событие event
 */

function handleTouchStart(e) {
  touchX = e.touches[0].clientX
  touchY = e.touches[0].clientY
}

function handleTouchMove(e) {
  //если движения не было то false
  if (!touchX) {
    return false
  }
  //получаю координаты после движения
  let touchXmove = e.touches[0].clientX
  let touchYmove = e.touches[0].clientY

  //смотрю разницу координат до и после по модулю, чтобы узнать в какую сторону движение
  let divX = touchX - touchXmove
  let divY = touchY - touchYmove
  //если divX больше, то движение влево иначе вправо
  if (Math.abs(divX) > Math.abs(divY)) {
    //если divX > 0, то движение влево
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
