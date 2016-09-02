var employeeList = [];
var employeeSchedule;
var scheduleKey = null;

// Provide file select feedback
$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
});

$(document).ready(function() {

	$('[name="Submit"]').hide();

	// Notify user of file selected
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
        
    });
    
	$(".dropdown-toggle").dropdown();

	// Get current week
	loadWeek();
	// Populate main table with schedule JSON data from DB
	prepareTable(fillTable);
	// Add event listener on upload field
	// Validate an xlsx file on callback
	$('#control').change(function() {

		var val = $(this).val();

		switch(val.substring(val.lastIndexOf('.') + 1).toLowerCase()) {
			case 'xlsx':
				$('[name="Submit"]').show();
				break;
			case 'xls':
				$('[name="Submit"]').hide();
				alert("Please rename your file to have a .xlsx extension.");
				break;
			default:
				$('[name="Submit"]').hide();
				alert("Only upload .xlsx (Excel) files, please.");
				break;
		}
	});

	$('#viewSchedule').click(function(){
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top 
		}, 500);
		return false;
	});

	// Check to make sure user included a file before submission
	$('#form1').submit(function(evt) {
		if ($.trim($('#control').val()) === "") {
			evt.preventDefault();
			alert("You did not pick a file to submit.");
		}
	});
});

// Returns true if an item is in an array
function isInArray(array, search) {
	return array.indexOf(search) >= 0;
};

// Filter table as user types name
function filter() {
	inp = $('#lastname').val();
    $("tr:not(:has(>th))").each(function() {
        if (~$(this).text().toLowerCase().indexOf( inp.toLowerCase() ) ) {
            // Show the row (in case it was previously hidden)
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

// Converts date string into comparable entity for sorting
function decodeDate(dateString) {
	parts = dateString.substr(4).split('/');
	return parseInt(parts[0], 10) * 40 + parseInt(parts[1], 10);
};

// Adds a row to the table
function addRow(row) {
	$('#schedule').append(row);
}

// Gets current week and displays it
function loadWeek() {
	var date, currentWeek
	Date.today().is().monday() ? date = String(Date.today()) : date = String(Date.today().previous().monday());
	currentWeek = "<h4>Week Of: " + date.slice(4, 15) + "</h4>";
	$("#date").append(currentWeek);
};

// Grab relevant data from the database
// Prepare table with header row
function prepareTable(callback) {
	$.getJSON('/download', function(data) {
		var fullSchedule = data[0];
		employeeSchedule = fullSchedule;
		var week = [];
		var tHead = "<tr><th>Employee (Phone)</th>";
		var tHeadEnd = "</tr>";	
		/* Each key is the name, value is an object
		 Object has key -> data and value -> time schedule to work
		 ie) 
		 'Lastname, Firstname' : {
			'Mon 7/14':'7:30a-4:00p',
			'Fri 7/19': '6:00p-9:00p'
		 }*/
		for (var key in fullSchedule) {
			// key == employee name
			if (key !== "_id") {
				employeeList.push(key);
				var employeeObj = fullSchedule[key];
				for (var key in employeeObj) {
					if (key !== 'conflict') {
						var date = String(key);
						if (!isInArray(week, key)) {
							week.push(key);
(function() {

	"use strict";

	// Provide file select feedback
	$(document).on('change', '.btn-file :file', function() {
	  var input = $(this),
	      numFiles = input.get(0).files ? input.get(0).files.length : 1,
	      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
	  input.trigger('fileselect', [numFiles, label]);
	});

	$(document).ready(function() {

		$('[name="Submit"]').hide();
		$(".dropdown-toggle").dropdown();

		// Notify user of file selected
	    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
	        
	        var input = $(this).parents('.input-group').find(':text'),
	            log = numFiles > 1 ? numFiles + ' files selected' : label;
	        
	        if( input.length ) {
	            input.val(log);
	        } else {
	            if( log ) alert(log);
	        }
	        
	    });

		// Get current week
		loadWeek();
		// Populate main table with schedule JSON data from DB
		prepareTable(fillTable);
		// Add event listener on upload field
		// Validate an xlsx file on callback
		$('#control').change(function() {

			var val = $(this).val();

			switch(val.substring(val.lastIndexOf('.') + 1).toLowerCase()) {
				case 'xlsx':
					$('[name="Submit"]').show();
					break;
				case 'xls':
					$('[name="Submit"]').hide();
					alert("Please rename your file to have a .xlsx extension.");
					break;
				default:
					$('[name="Submit"]').hide();
					alert("Only upload .xlsx (Excel) files, please.");
					break;
			}
		});

		$('#viewSchedule').click(function(){
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top 
			}, 500);
			return false;
		});

		// Check to make sure user included a file before submission
		$('#form1').submit(function(evt) {
			if ($.trim($('#control').val()) === "") {
				evt.preventDefault();
				alert("You did not pick a file to submit.");
			}
		});
	});

	// Returns true if an item is in an array
	function isInArray(array, search) {
		return array.indexOf(search) >= 0;
	};

	// Filter table as user types name
	window.filter = function() {
		var inp = $('#lastname').val();
	    $("tr:not(:has(>th))").each(function() {
	        if (~$(this).text().toLowerCase().indexOf(inp.toLowerCase())) {
	            // Show the row (in case it was previously hidden)
	            $(this).show();
	        } else {
	            $(this).hide();
	        }
	    });
	}

	// Converts date string into comparable entity for sorting
	function decodeDate(dateString) {
		var parts = dateString.substr(4).split('/');
		return parseInt(parts[0], 10) * 40 + parseInt(parts[1], 10);
	};

	// Adds a row to the table
	function addRow(row) {
		$('#schedule').append(row);
	}

	// Gets current week and displays it
	function loadWeek() {
		var date, currentWeek
		Date.today().is().monday() ? date = String(Date.today()) : date = String(Date.today().previous().monday());
		currentWeek = "<h4>Week Of: " + date.slice(4, 15) + "</h4>";
		$("#date").append(currentWeek);
	};

	// Grab relevant data from the database
	// Prepare table with header row
	function prepareTable(callback) {
		var employeeList = [];
		var employeeSchedule;

		$.getJSON('/download', function(data) {
			var fullSchedule = data[0];
			employeeSchedule = fullSchedule;
			var week = [];
			var tHead = "<tr><th>Employee (Phone)</th>";
			var tHeadEnd = "</tr>";	
			/* Each key is the name, value is an object
			 Object has key -> data and value -> time schedule to work
			 ie) 
			 'Lastname, Firstname' : {
				'Mon 7/14':'7:30a-4:00p',
				'Fri 7/19': '6:00p-9:00p'
			 }*/
			for (var key in fullSchedule) {
				// key == employee name
				if (key !== "_id") {
					employeeList.push(key);
					var employeeObj = fullSchedule[key];

					for (var prop in employeeObj) {

						if (prop !== 'conflict') {
							var date = String(prop);

							if (!isInArray(week, prop)) {
								week.push(prop);
							}
						}
					}
				}
			}
		}
		// Ensure dateString array is sorted
		week.sort(function(a, b) {
			return decodeDate(a) - decodeDate(b);
		});
		for (i in week) {
			tHead = tHead + "<th>" + week[i] + "</th>";
		}
		// Fill table cells temporarily
		tHead += tHeadEnd;
		addRow(tHead);
		callback(updateTable);
	});
};

// Filling rows temporarily with placeholders
function fillTable(callback) {
	for (var key in employeeSchedule) {
		if (key !== "_id") {
			var tBody = "<tr>";
			var tBodyEnd = "</tr>";
			tBody += "<td>" + String(key) + "</td>";
			var employeeObj = employeeSchedule[key];
			for (var i = 0 ; i < 7; i++) {
				tBody += "<td class='editableCell'>     </td>";
			}
		}
		tBody += tBodyEnd;
		addRow(tBody);
	}
	callback(fillPhone);
};

// Go through table cells and update rows of employee
function updateTable(callback) {
	$('#schedule').each(function() {
		$(this).find('td').each(function() {
			var cellData = this.innerHTML;
			/* Iterate through table cells. When employee is found, 
			their name becomes key.  Loop through row cells and lookup
			in schedule object to see if they work that day.*/
			if (isInArray(employeeList, cellData)) {
				scheduleKey = cellData;			
			} else if (scheduleKey !== null) {
				var headerCell = $('#schedule th').eq($(this).index());
				var headerDate = headerCell.text();
				var scheduleIsolated = employeeSchedule[scheduleKey];
				for (var key in scheduleIsolated) {
					if (key == headerDate) {
						this.innerHTML = scheduleIsolated[key];
					} 
				}
			}
		});
	});
	callback(createEditableCells);
};

// Append employee phone numbers to the table 
function fillPhone(callback) {
	$.getJSON('/download/employeelist', function(data) {
		for (i in data) {
			var name = data[i]['name'];
			var option = "<option>" + name + "</option>";
			$('#schedule tr td:nth-child(1)').each(function() {
				if (this.innerHTML == name) {
					this.innerHTML += " (" + data[i]['phone'] + ")";
				}
			});
			$('#sel1').append(option);
		}
	});
	callback();
};

/* Allow managers to edit table cells.  Perform AJAX post on enter keystroke. */
function createEditableCells() {
	$('#schedule tbody').on("click", ".editableCell", function() {
		var originalContent = $(this).text();
		var employeeData = $(this).closest('tr').find('td:first').text();
		var index = employeeData.indexOf('(') - 1;
		var employeeName = employeeData.substring(0, index);
		var date = ($('#schedule tbody tr th').eq($(this).index())).text();

		$(this).addClass('cellEditing');
		$(this).html("<input type='text' value='" + originalContent + "' />");
		$(this).children().first().focus();

		$(this).children().first().keypress(function(e) {
			if (e.which == 13) {
				var newContent = $(this).val();
				$(this).parent().text(newContent);
				$(this).parent().removeClass('cellEditing');

				$.ajax({
					type: 'POST',
					url: '/upload/cell',
					dataType: 'json',
					data: {'name': employeeName,
							'time': newContent,
							'date': date},
					success: function(result) {
						if (result.status == 200) {
							alert("Schedule Edit Successful");
						}
					},
					error: function(result) {
						alert("Error posting schedule");
					}
				});
			}
		});

		$(this).children().first().blur(function(evt) {
			evt.preventDefault();
			$(this).parent().text(originalContent);
			$(this).parent().removeClass('cellEditing');
		});
	});

	// Highlight row/column on mouseover
	$('#schedule').delegate('td', 'mouseover mouseleave', function(e) {
		var index = $(this).index();
		if (e.type == 'mouseover') {
			$(this).addClass('on');
			$(this).parent().addClass('hover');
			$('#schedule tr td:nth-child('+ (index + 1) + ')').addClass('hover');
			$('#schedule tbody tr th').eq(index).addClass('hover');
			$(this).closest('tr').find('td:first').addClass('hover');
		} else {
			$(this).removeClass('on');
			$(this).parent().removeClass('hover');
			$('#schedule tr td:nth-child('+ (index + 1) + ')').removeClass('hover');
			$('#schedule tbody tr th').eq(index).removeClass('hover');
			$(this).closest('tr').find('td:first').removeClass('hover');
		}
	});
};
			// Ensure dateString array is sorted
			week.sort(function(a, b) {
				return decodeDate(a) - decodeDate(b);
			});

			for (var i = 0; i < week.length; i++) {
				tHead = tHead + "<th>" + week[i] + "</th>";
			}

			// Fill table cells temporarily
			tHead += tHeadEnd;
			addRow(tHead);
			callback(updateTable, employeeList, employeeSchedule);
		});
	};

	// Filling rows temporarily with placeholders
	function fillTable(callback, employeeList, employeeSchedule) {
		for (var key in employeeSchedule) {

			if (key !== "_id") {

				var tBody = "<tr>";
				var tBodyEnd = "</tr>";
				tBody += "<td>" + String(key) + "</td>";
				var employeeObj = employeeSchedule[key];

				for (var i = 0 ; i < 7; i++) {
					tBody += "<td class='editableCell'>     </td>";
				}
			}

			tBody += tBodyEnd;
			addRow(tBody);

		}

		callback(fillPhone, employeeList, employeeSchedule);
	};

	// Go through table cells and update rows of employee
	function updateTable(callback, employeeList, employeeSchedule) {
		var scheduleKey = null;

		$('#schedule').each(function() {
			$(this).find('td').each(function() {
				var cellData = this.innerHTML;
				/* Iterate through table cells. When employee is found, 
				their name becomes key.  Loop through row cells and lookup
				in schedule object to see if they work that day.*/
				if (isInArray(employeeList, cellData)) {
					scheduleKey = cellData;			
				} else if (scheduleKey !== null) {
					var headerCell = $('#schedule th').eq($(this).index());
					var headerDate = headerCell.text();
					var scheduleIsolated = employeeSchedule[scheduleKey];

					for (var key in scheduleIsolated) {
						if (key == headerDate) {
							this.innerHTML = scheduleIsolated[key];
						} 
					}
					
				}
			});
		});
		callback(tableHighlight);
	};

	// Append employee phone numbers to the table 
	function fillPhone(callback) {
		$.getJSON('/download/employeelist', function(data) {
			for (var i = 0; i < data.length; i++) {
				var name = data[i]['name'];
				var option = "<option>" + name + "</option>";
				$('#schedule tr td:nth-child(1)').each(function() {
					if (this.innerHTML == name) {
						this.innerHTML += " (" + data[i]['phone'] + ")";
					}
				});
				$('#sel1').append(option);
			}
		});
		callback();
	};

	/* Allow managers to edit table cells.  Perform AJAX post on enter keystroke. */
	function tableHighlight() {
		// Highlight row/column on mouseover
		$('#schedule').delegate('td', 'mouseover mouseleave', function(e) {
			var index = $(this).index();
			if (e.type == 'mouseover') {
				$(this).addClass('on');
				$(this).parent().addClass('hover');
				$('#schedule tr td:nth-child('+ (index + 1) + ')').addClass('hover');
				$('#schedule tbody tr th').eq(index).addClass('hover');
				$(this).closest('tr').find('td:first').addClass('hover');
			} else {
				$(this).removeClass('on');
				$(this).parent().removeClass('hover');
				$('#schedule tr td:nth-child('+ (index + 1) + ')').removeClass('hover');
				$('#schedule tbody tr th').eq(index).removeClass('hover');
				$(this).closest('tr').find('td:first').removeClass('hover');
			}
		});
	};
	
})();
