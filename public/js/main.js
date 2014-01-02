/**
 * Created by Limon on 02.01.14.
 */
$(function() {
    console.log('Ready');
    $('#login').on('submit', function(e) {
        e.preventDefault();
        var that = $(e.target);
        $.ajax({
            type: 'POST',
            url: '/login',
            data: $(this).serialize(),
            success: function(data) {
                document.location.href = '/';
            },
            statusCode: {
                404: function() {
                    alert('Cant login');
                },
                403: function(e) {
                    console.log(e.responseJSON);
                    data = e.responseJSON;
                    $('#error').removeClass('hidden').children('span').text(data.message);
                    //$('#error').fadeOut(5000).addClass('hidden');
                }
            }
        });
    });
});