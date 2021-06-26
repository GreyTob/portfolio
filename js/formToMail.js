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
      document.querySelector('#formSend input').setAttribute(readonly)
      setTimeout(function () {
        document.querySelector('#formSend').textContent = 'Отправлено'
        document.querySelector('#formSend input').removeAttribute(readonly)
        th.trigger('reset')
      }, 1000)
    })
    return false
  })
})
