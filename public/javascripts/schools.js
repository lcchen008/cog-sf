// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    $('#tableSchools tbody').on('click', 'td a.linktoschoolsite', redirectToSchool);

    // Delete User link click
    $('#tableSchools tbody').on('click', 'td a.linkdeleteschool', deleteSchool);
});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/schools/schoollist', function( data ) {

		// Stick our user data array into a userlist variable in the global object
		userListData = data;
	
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td>' + this.gender_preference + '</td>';
            tableContent += '<td><a href="http://'+this.url + '"' + ' class = "linktoschoolsite" rel = "'+ this.url +'">' + this.url + '</a></td>';
            tableContent += '<td>' + this.location + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteschool" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#tableSchools tbody').html(tableContent);
    });
};

function redirectToSchool(event) {

};

// Delete User
function deleteSchool(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this school?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/schools/deleteschool/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;
    }
};