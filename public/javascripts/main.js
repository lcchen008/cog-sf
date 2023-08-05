// Send email
function sendEmail(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('确认提交?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our send email
        $.ajax({
            type: 'POST',
            url: '/main/sendemail' + $(this).attr('rel')
        }).done(function( response ) {

            if (response.yo != "error") {
                alert("Email sent successfully!");
            }

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

function sendEmailForm(event) {
    var errorCount = 0;
    
    
    if ($('#inputFullName').val() === '') {
        $('#labelFullName').addClass('w3-text-red');
        errorCount++;
    }

    if ($('#inputEmail').val() === '') {
        $('#labelEmail').addClass('w3-text-red');
        errorCount++;
    }

    if ($('#inputSubject').val() === '') {
        $('#labelSubject').addClass('w3-text-red');
        errorCount++;
    }  
    
    if ($('#inputMessage').val() == '') {
        $('#labelMessage').addClass('w3-text-red');
        errorCount++;
    }

    if (errorCount == 0) {

        // If it is, compile all user info into one object
        var newMessage = {
            'fullname': $('#inputFullName').val(),
            'email': $('#inputEmail').val(),
            'subject': $('#inputSubject').val(),
            'message': $('#inputMessage').val()
        };

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newMessage,
            url: '/main/sendemail',
            dataType: 'JSON'
        }).done(function(response) {

            console.log(response.yo)
            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                //$('#addUser fieldset input').val('');
                alert('消息发送成功！我们会尽快回复您！');
                window.location.href = "/main";
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('很抱歉，消息发送失败，请您重试一次。');
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('请填写所有栏目，谢谢！');
        return false;
    }
}

const button = document.getElementById('submitContact');
button.addEventListener('click', sendEmailForm);