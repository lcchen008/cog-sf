// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    // Add student button click
    $('#btnAddStudent').on('click', addStudent);

    $(document).keypress(function(e){
        if (e.which == 13){
            $("#btnAddStudent").click();
        }
    });
});

// Functions =============================================================

// Add User
function addStudent(event) {
    var errorCount = 0;
    
    
    if ($('#inputStudentName').val() === '') {
        $('#labelStudentName').addClass('w3-text-red');
        errorCount++;
    }

    if ($('#inputStudentEmail').val() === '') {
        $('#labelStudentEmail').addClass('w3-text-red');
        errorCount++;
    }

    if ($('#selectStudentGender').val() === '') {
        $('#labelStudentGender').addClass('w3-text-red');
        errorCount++;
    }  
    
    if ($('#inputStudentDob').val() == '') {
        $('#labelStudentDob').addClass('w3-text-red');
        errorCount++;
    }

    if (errorCount == 0) {

        // If it is, compile all user info into one object
        var newStudent = {
            'fullname': $('#inputStudentName').val(),
            'email': $('#inputStudentEmail').val(),
            'phone': $('#inputStudentPhone').val(),
            'address': $('#inputStudentAddress').val(),
            'gender': $('#selectStudentGender').val(),
            'dob': $('#inputStudentDob').val()
        };

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newStudent,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                window.location.href = "/index";

            }
            else if (response.msg === 'exists') {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: the student already exists');

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all required fields');
        return false;
    }
};