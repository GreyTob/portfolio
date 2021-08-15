document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader-wrapper')
  const wrapper = document.querySelector('.wrapper')

  setTimeout(() => {
    wrapper.style.display = 'block'
  }, 1200)
  setTimeout(() => {
    loader.style.opacity = 0
    wrapper.style.opacity = 1
    setTimeout(() => {
      loader.style.display = 'none'
    }, 400)
  }, 1500)
})
