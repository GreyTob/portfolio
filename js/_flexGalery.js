const slides = document.querySelectorAll('.slide')

let xl = document.querySelectorAll('.xl')
window.addEventListener('resize', () => {
  if (window.innerWidth < 767) {
    xl.forEach((item) => item.remove())
  } else {
    xl.forEach((item) =>
      document.querySelector('.container.container').append(item)
    )
  }
})

function activeSlidePlugin(activeSlide) {
  slides[activeSlide].classList.add('active')

  slides.forEach((slide) => {
    slide.addEventListener('click', () => {
      slides.forEach((slide) => {
        slide.classList.remove('active')
      })
      slide.classList.add('active')
    })
  })

  if (window.innerWidth < 767) {
    xl.forEach((item) => item.remove())
  } else {
    xl.forEach((item) =>
      document.querySelector('.container.container').append(item)
    )
  }
}

const max = slides.length
const randomSlide = Math.floor(Math.random() * max)

activeSlidePlugin(randomSlide)
