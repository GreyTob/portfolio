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
        document.querySelector('#formSend').textContent = 'Отправлено'

        th.trigger('reset')
      }, 1500)
    })
    return false
  })
})
