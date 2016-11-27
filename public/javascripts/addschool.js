// DOM Ready =============================================================
$(document).ready(function() {
    // Add User button click
    $('#btnAddSchool').on('click', addSchool);
    $(document).keypress(function(e){
        if (e.which == 13){
            $("#btnAddSchool").click();
        }
    });
});

// Functions =============================================================

// Add User
function addSchool(event) {

    var errorCount = 0;
    if ($('#schoolName').val() === '') {
        $('#labelSchoolName').addClass('w3-text-red');
        errorCount++;
    }

    if (errorCount == 0) {

        // If it is, compile all user info into one object
        var newSchool = {
            'name': $('input.w3-input#schoolName').val(),
            'url': $('input.w3-input#schoolUrl').val(),
            'gender_preference': $('#selectGenderPreference').val(),
            'location': $('#selectSchoolLocation').val()
        };

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newSchool,
            url: '/schools/addschool',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                window.location.href = "/schools";

            }
            else if (response.msg === 'exists') {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: the school already exists');

            }
        });
    } else {
        // If errorCount is more than 0, error out
        alert('Please fill in all required fields');
        return false;
    }
};