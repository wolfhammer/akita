$(function() {
	$("#issue-submit").click(function(e) {
		e.preventDefault();
		var $form = $('#form-submit-issue');
		var formData = $form.serialize();
		console.log(formData);

		$.ajax({
			url: '/api/issues',
			type: 'POST',
			data: formData,
			beforeSend: function() {
		
			},
			complete: function () {
				
			},
			success: function(data) {
				//location.reload();
				console.log('Success: ' + data);
			}
		});
	});
});