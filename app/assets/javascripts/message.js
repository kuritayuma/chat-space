$(function(){
  function buildHTML(message){
    var image = '';
    if (message.image.url) {
      image = `<img src="${message.image.url}" class="lower-message__image">`;
    }
    var html = `<div class="comment" data-id="${message.id}">
                  <div class="message-user">
                  ${message.user_name}
                  </div>
                  <div class="time-stamp">
                  ${message.timestamp}
                  </div>
                  <p class="lower-message__content">
                  ${message.text}
                  </p>
                  ${image}
                </div>`
    return html;
  }
  // メッセージ送信
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents-right').append(html)
      $('#new_message')[0].reset();
      $('.contents-right').animate({scrollTop: $('.contents-right')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    setTimeout(function(){
      $('.form__submit').prop('disabled', false)
    }, 1000);
  });

  // 自動更新
  var path = location.pathname
  var group_id = $('.header-right-group').data('id');
  if (path == `/groups/${group_id}/messages`) {
    setInterval(function(){
      var message_id = $('.comment:last').data('id');
        $.ajax({
          url: path,
          type: 'GET',
          data: {
            id: message_id
          },
          dataType: 'json'
        })

        .done(function(data){
          data.forEach(function(message){
            var html = buildHTML(message)
            $('.contents-right').append(html);
            $('.contents-right').animate({scrollTop: $('.contents-right')[0].scrollHeight}, 'fast');
          });
        })

        .fail(function(){
          alert('error');
        });
    }, 5000);
  }
});
