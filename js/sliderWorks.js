const upBtn = document.querySelector('.up-button')
const downBtn = document.querySelector('.down-button')
const ArrowLeft = document.querySelector('#ArrowLeft')
const ArrowRight = document.querySelector('#ArrowRight')

const container = document.querySelector('.works')
const sidebar = document.querySelector('.sidebar')

const mainSlide = document.querySelector('.main-slide')
const slideCount = mainSlide.querySelectorAll('div').length

//переменная для того что бы контролировать какой сейчас слайд
let activeSlideIndex = 0

//количество слайдов -1
sidebar.style.top = `-${(slideCount - 1) * 100}vh`

upBtn.addEventListener('click', () => {
  changeSlide('up')
})
downBtn.addEventListener('click', () => {
  changeSlide('down')
})
ArrowRight.addEventListener('click', () => {
  changeSlide('up')
})
ArrowLeft.addEventListener('click', () => {
  changeSlide('down')
})
document.addEventListener('keydown', (event) => {
  console.log(event.key)
  if (event.key === 'ArrowRight') {
    changeSlide('up')
  } else if (event.key === 'ArrowLeft') {
    changeSlide('down')
  }
})

//переключения по скролу и кнопкам ввер-вниз отключил, из-за fullSkroll
// document.addEventListener('keydown', (event) => {
//   // console.log(event.key)
//   if (event.key === 'ArrowUp') {
//     changeSlide('up')
//   } else if (event.key === 'ArrowDown') {
//     changeSlide('down')
//   }
// })

// window.addEventListener('mousewheel', () => {
//   changeSlide('up')
// })

function changeSlide(direction) {
  if (direction === 'up') {
    activeSlideIndex++
    //если activeSlideIndex равен количеству сладов, то обнулить
    if (activeSlideIndex === slideCount) {
      activeSlideIndex = 0
    }
  } else {
    activeSlideIndex--
    if (activeSlideIndex < 0) {
      activeSlideIndex = slideCount - 1
    }
  }

  const height = container.clientHeight

  mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`
  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}
