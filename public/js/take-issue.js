$(function() {
	var $button = $('#button-take-issue');
	var issueId = $button.data('issueId');
	var uid = 5561;

	$button.click(function(e) {
		if ($button.hasClass('disabled')) {
			e.preventDefault;
			return;
		};
		e.preventDefault();

		$.post('/issues/take/' + uid + '/' + issueId, function(data) {
			$button
				.addClass('success')
				.addClass('disabled')
				.text('You have successfully taken this issue');
		});
	});
});