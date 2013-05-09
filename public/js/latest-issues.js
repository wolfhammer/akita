$(function() {
console.log('this');
	$.getJSON('/api/latest', function(latestIssues) {
		console.log('this: ' + issueList);
		var html = ejs.render(issues, issueList);
		document.getElementById('latest-issues').innerHTML = html;
	});
});