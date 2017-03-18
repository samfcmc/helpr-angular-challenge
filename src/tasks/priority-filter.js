/**
 * Priority Filter
 * Takes a priority value and returns
 * the corresponding text
 */

app.filter('priority', [() => {
	return (input) => {
		let priorities = {
			"1": "High",
			"2": "Normal",
			"3": "Low",
			"0": "Unknown"
		}

		var text = priorities[input];

		if(!text) {
			text = priorities[0];
		}
		
		return text;
	}
}]);