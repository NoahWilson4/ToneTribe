$(document).on('ready', function() {

var userInfo = {
	bands: [],
	instruments: [],
	styles: [],
	skills: [],
	inspirations: [],
	improvComp: 50
}
	

	$('.sidebar-list-text').append('<input type="text" class="add-new-word editing-profile edit" placeholder="Add New...">');
//// add new item 
	$(document).on('blur', '.add-new-word', function(){
			console.log('find id...');
			var val = $(this).val();
			var attr = $(this).closest('p').attr('name');
			console.log('attr, val: ', attr, val);
			userInfo[attr].push(val);
			console.log('userInfo', userInfo);
			$(this).closest('.sidebar-list-text').append('<div class="words editing-profile edit">' + $(this).val() +'</div>');
			$(this).closest('.sidebar-list-text').find('.words').last().append('<button class="btn btn-default btn-xs delete-word">X</button>');
			$(this).closest('.sidebar-list-text').append('<input type="text" class="add-new-word editing-profile edit" placeholder="Add New...">');
			$(this).remove();
	});

//////// delete item
	$(document).on('click', '.delete-word', function(){
			// var val = $(this).closest('.words').text().split(',').shift().split('X').pop();
			var val = $(this).closest('.words').text();
			val = val.substring(0, val.length-1);
			var attr = $(this).closest('p').attr('name');
			console.log('val, attr', val, attr);
			console.log('before deleted...', userInfo[attr]);
			var a = userInfo[attr];
			console.log('a: ', a);
			for (var i = 0; i < a.length; i++){
				console.log('a[i], val', a[i], val);
				if (a[i] === val) {
					a.splice(i, 1);
					console.log('a deleted: ', a);
				}
			}
			console.log('after deleted...', userInfo);
			$(this).closest('.words').remove();
			//// ajax request here
			
	});

	$('#signup2-submit').on('click', function(){
		var id = $(this).closest('form').find('#id').attr('value');
		console.log('id: ', id);
		userInfo['id'] = id;
		var searchResults = $.ajax({
			type: 'POST',
			url: '/updateUserFromClient',
			traditional: true,
			data: userInfo
		}).done(function() {
		  	console.log( "success" );
		  })
		  .fail(function() {
		    console.log( "error" );
		  })
		  .always(function() {
		    console.log( "complete, searchResults: ", searchResults );
		  });
		// $.post('/updateUserFromClient', {userInfo: userInfo}, function(response){

		// })
	})


	//////////  create ajax call to save userinfo on submit/go to next page

})