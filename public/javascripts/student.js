// DOM Ready =============================================================
$(document).ready(function() {
    // Add student button click
    // $('#btnAddApplication').on('click', addApplication);
    populateApplications();

    // Delete application click
    $('#applications').on('click', 'span.delete-app', deleteApp);

    $(document).keypress(function(e){
        if (e.which == 13){
            $("#btnAddApplication").click();
        }
    });
});

// Fill the applications data for the student
function populateApplications() {
    var student_id = document.getElementsByTagName("head")[0].getAttribute("id");

    // alert(student_id);

    // Empty content string
    var applications = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/applications/getapplications/' + student_id, function( data ) {
        // console.log(data[0]);
        // For each item in our JSON, add a table row and cells to the content string

        var status_map = new Map();

        status_map.set("Initiated", "Initiated");
        status_map.set("Under Processing", "Under Processing");
        status_map.set("Admitted", "Admitted");

        $.each(data, function(){
            applications += '<br> <div class="w3-card-4"> <header application_id=' +
             this.application_id + ' class="w3-container w3-purple">' +
             '<span class = "w3-xxlarge">' + this.school_name + '</span>' +
              '<span class="w3-closebtn w3-xxlarge delete-app" rel=' + this.application_id +
              ' rel_name="' + this.school_name + '" student_id='+ student_id +'> X </span> </header>' + 
              '<div class="w3-container"> <span class = "w3-xxlarge"> Status: </span>' +
              '<span class = "w3-xxlarge editable" data-type="select" data-url="/applications/status/' + this.application_id  + '"' +
              ' data-data=\'[["Initiated", "Initiated (刚刚创建)"], ["Under Processing", "Under Processing (已开始申请)"], ["Admitted", "Admitted (已录取)"]]\'>' +
              status_map.get(this.status) + '</span> </div> </div>';
        });

        // Inject the whole content string into our existing HTML
        $('#applications').html(applications);

        $('.editable').jinplace();
    });
};

// Functions =============================================================

// Add User not used here
function addApplication(event) {
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

function deleteApp(event) {
    var confirmation = confirm('Are you sure to delete ' + $(this).attr('rel_name') + '?');

    if (confirmation === true) {
        // If they did, do our delete
        var delete_vars = {
            "student_id": $(this).attr('student_id')
        }
        $.ajax({
            type: 'DELETE',
            data: delete_vars,
            url: '/applications/deleteapp/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the application list
            populateApplications();

        });
    } else {
        return false;
    }
}