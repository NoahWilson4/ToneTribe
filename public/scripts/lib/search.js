

$(document).on('ready', function(){

var lowerCase = function(x){
		if ($.isArray(x) === true){
			for (var y = 0; y < x.length; y++){
				x[y] = x[y].toLowerCase();
			}
			return x;
		} else if (x) {
			var lowerCased = x.toLowerCase();
			return lowerCased;
			}
		};

	var positiveResultsBands = [];
	var positiveResultsFinalBands = [];

	var positiveResults = [];
	var positiveResultsFinal = [];
	
	$('#submitSearch').on('submit', function(e){
		console.log('submitted...');
		$('.search-result-info').hide();
		$('#search-results-musicians').empty();
		$('#search-results-bands').empty();
		e.preventDefault();
		var form = $(e.target);
		var searchedFor = [];
		var searchedForValue = [];
		form.find('.searchInput')
			.map(function() {
			return {
				name: $(this).attr('name'),
				value: lowerCase($(this).val())
				}
				})
				.toArray()
				.filter(function(searchObject) {
					return searchObject.value;
				})
				.forEach(function(searchObject) {
					searchedFor.push(searchObject.name);
					searchedForValue.push(searchObject.value);
					// propertySearch(searchObject.name, searchObject.value);
				});
		console.log('searchedForValue: ', searchedForValue);
		console.log('searchedFor: ', searchedFor);
		var searchFor = {
			searchedFor: searchedFor, 
			searchedForValue: searchedForValue
		};
		console.log('searchFor: ', searchFor);

		var searchResults = $.ajax({
			type: 'POST',
			url: '/api/findUsers',
			traditional: true,
			data: searchFor
		}).done(function() {
		  	console.log( "success" );
		  })
		  .fail(function() {
		    console.log( "error" );
		  })
		  .always(function() {
		    console.log( "complete, searchResults: ", searchResults );
		  });

		 



		  console.log('searchResults', searchResults);

		

	///// users /////////
		for (var i = 0; i < positiveResults.length; i++) {
			var userToQualify = positiveResults[i];
			var matches = 0;

			for (var x = 0; x < searchedFor.length; x++){
							
				var key = searchedFor[x];
				var value = searchedForValue[x];
				var userKey = userToQualify[key];

				if ( $.isArray(userKey)) {
					for (var z = 0; z < userKey.length; z++) {
						if (userKey[z] === value) {
					matches++;
						}
					}
				}
				var userValue = userToQualify[key];
				userValue = lowerCase(userValue);
				if ( userValue === value ) {
					matches++;
				}
				if (matches === searchedFor.length) {
					positiveResultsFinal.push(positiveResults[i]);
				}
			}	
		};
	///// bands /////////
		// for (var i = 0; i < positiveResultsBands.length; i++) {
		// 	var userToQualify = positiveResultsBands[i];
		// 	console.log('band to qualify test: ', userToQualify);
		// 	var matches = 0;

		// 	for (var x = 0; x < searchedFor.length; x++){
							
		// 		var key = searchedFor[x];
		// 		var value = searchedForValue[x];
		// 		var userKey = userToQualify[key];
		// 		console.log('searchedFor test: ', searchedFor);
		// 		console.log('searchedForValue test: ', searchedForValue);
		// 		console.log('band to qualify key test: ', userKey);

		// 		if ( $.isArray(userKey)) {
		// 			for (var z = 0; z < userKey.length; z++) {
		// 				if (userKey[z] === value) {
		// 			matches++;
		// 				}
		// 			}
		// 		}
		// 		var userValue = userToQualify[key];
		// 		userValue = lowerCase(userValue);
		// 		if ( userValue === value ) {
		// 			matches++;
		// 		}
		// 		if (matches === searchedFor.length) {
		// 			positiveResultsFinalBands.push(positiveResultsBands[i]);
		// 		}
		// 	}	
		// };

		console.log('positiveResultsFinal: ', positiveResultsFinal);
		// console.log('positiveResultsFinalBands', positiveResultsFinalBands);
			

/////// search page rendering and displaying results ////////

			$('.search-results').show();
			$('.search-form').hide();
	
			

			for (var i = 0; i < positiveResultsFinal.length; i++){
				var result = positiveResultsFinal[i];
				result.displayResultsMusicians();
			}
			if (positiveResultsFinal.length < 1 && positiveResultsFinalBands < 1) {
				$('.search-result-info').show();
			}

			for (var i = 0; i < positiveResultsFinalBands.length; i++){
				var result = positiveResultsFinalBands[i];
				result.displayResultsBands();
			}
			// if (positiveResultsFinalBands.length < 1) {
			// 	$('#search-results-container').prepend('<div class="list-group results"</div><div class="search-result-info"><h4 class="list-group-item-heading">No results found.</h4></div>')
			// }

	});
	// $('.search-results').hide();

	$(document).on('click', '.search-again', function(){
		// $('.search-results').hide();
		// $('.search-results-container').empty();
		positiveResults = [];
		positiveResultsFinal = [];
		positiveResultsBands = [];
		positiveResultsFinalBands = [];
		$('.search-form').show();
		$('input').val('');
	})


});


