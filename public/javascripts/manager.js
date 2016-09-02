// Allow users to edit table cells and post via AJAX
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
}

$(window).load(function() {
	createEditableCells();
});