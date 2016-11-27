// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateSchools();

    // $('select').select2("val",null);

    $("#selectSchoolList").select2({
        placeholder: "Search a School...",
        allowClear: true
    });

    // Add User button click
    $('#btnAddApplication').on('click', addApplication);

    $(document).keypress(function(e){
        if (e.which == 13){
            $("#btnAddApplication").click();
        }
    });
});

// Functions =============================================================

// Fill table with data
function populateSchools() {

    // Empty content string
    var options = ''; // <option value="N/A" selected="selected"> Choose a School </option>';

    // jQuery AJAX call for JSON
    $.getJSON( '/schools/schoollistpairs', function( data ) {

        data = data.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        
        options += '';
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            options += '<option value="' + this._id +'"">' + this.name + '</option>';
        });

        // Inject the whole content string into our existing HTML table
        $('#selectSchool #selectSchoolList').html(options);
    });
};

// Add Application
function addApplication(event) {
    // event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;

    var data = $('#selectSchoolList').select2('data')

    if (data === null) {
        $('#labelSelectSchool').addClass('w3-text-red');
        errorCount++;
    }

    if (errorCount == 0) {
        var student_id = document.getElementsByTagName("head")[0].getAttribute("id");

        var new_application = {
            'student_id': student_id,
            'school_id': $('#selectSchoolList').val(),
            'status': $('#selectApplicationStatus').val()
        };

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: new_application,
            url: '/applications/addapplication',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                // Clear the form inputs
                $('#selectSchoolList').val('');
            } else if (response.msg === 'exists') {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: the application for this school already exists');
            }
        });
        
        window.location.href = "/student/"+student_id;
    }  else {
        // If errorCount is more than 0, error out
        alert('Please fill in all required fields, as shown in red');
        return false;
    }
};