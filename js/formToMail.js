document.querySelector('form').onsubmit = (e) => {
  e.preventDefault()
}

$(document).ready(function () {
  //E-mail Ajax Send
  $('form').submit(function () {
    //Change
    var th = $(this)
    $.ajax({
      type: 'POST',
      url: 'mail.php', //Change
      data: th.serialize(),
    }).done(function () {
      // alert('Сообщение Отправлено!')
      document.querySelector('#formSend').textContent = 'Отправка...'

      setTimeout(function () {
        const button = document.querySelector('#formSend')
        button.textContent = 'Отправлено'
        button.style.background = $white
        th.trigger('reset')
      }, 1500)

      setTimeout(function () {
        const button = document.querySelector('#formSend')
        button.textContent = 'Отправить'
        button.style.background = $green
      }, 5000)
    })
    return false
  })
})
