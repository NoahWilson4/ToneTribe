$(document).on('ready', function() {

var userInfo = {
	bands: [],
	instruments: [],
	styles: '',
	skills: [],
	inspirations: [],
	improvComp: undefined
}
	

	$('.sidebar-list-text').append('<input type="text" class="add-new-word editing-profile edit" placeholder="Add New...">');
//// add new item 



	$(document).on('blur', '.add-new-word', function(event){
			var val = $(this).val();
			var attribute = $(this).closest('p').attr('name');
			userInfo[attribute].push(val);
			var data = userInfo[attribute];
			$('#' + attribute).attr('value', data);
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
			var a = userInfo[attr];
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

	

	$('#improvCompRange').change(function(){
		userInfo.improvComp = $(this).text();
		console.log(userInfo);
		$('#comp').text($(this).text());
		$('#improv').text(100 - $(this).text());
		$('#improvComp').attr('value', $(this).text());
		$('#ratio-bar-signup').attr("style", "width: " + $(this).text() + "%")
		$('#ratio-bar-signup2').attr("style", "width: " + (100 - $(this).text()) + "%")
	})

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

	// var fileReader = new FileReader();
	// 	fileReader.readAsDataURL(document.getElementById("upload-profilePic").files[0]);

	// 	fileReader.onload = function (oFREvent) {
	// 	    document.getElementById("uploadPreview").src = oFREvent.target.result;
	// };


////// how can i do this async allowing time for aws to store the image?
///////// large image files????
	// function findProfileUrl(){
	// 	console.log('hello?');
	// 	var profileUrl = 'url(' + $('#upload-profilePic').find('#profileUrl').attr('value') + ')';
	// 	console.log('url', profileUrl);
	// 	$('#profile-image-holder').css({
	// 		backgroundImage: profileUrl
	// 	})
	// };
	// findProfileUrl();

	// function findBackgroundUrl(){
	// 	console.log('hello?');
	// 	var backgroundUrl = 'url(' + $('#upload-backgroundPic').find('#backgroundUrl').attr('value') + ')';
	// 	console.log('url', backgroundUrl);
	// 	$('#background-image-holder').css({
	// 		backgroundImage: backgroundUrl
	// 	})
	// };
	// findBackgroundUrl();


	//////////  create ajax call to save userinfo on submit/go to next page

})