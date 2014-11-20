$(document).on('ready', function() {


	




//////////////  posting  ////////////////////
////////////////////////////////////////////////


	$(document).on('click', '.drop-note', function(){
		console.log('click');
		$('#addPost').css({display: 'inherit'});
		$('#dropNote').text('Cancel').addClass('cancel').removeClass('drop-note');
	});

	$(document).on('click', '.cancel', function(){
		$('#addPost').css({display: 'none'});
		$('#dropNote').text('Drop a Note').removeClass('cancel').addClass('drop-note');
	});

	var postTemplate = $('#post-template').html();
	var compilePostTemplate = Handlebars.compile(postTemplate);

	$(document).on('click', '.like-post', function(){
		var likesText = $(this).closest('.post-container').find('.post-likes');
		var postId = $(this).attr('value');
		console.log('postId: ', postId);
		$.post('/api/likePost', {_id: postId}, function(response){
			console.log('likes response: ', response.likes);
			$(likesText).text(response.likes + ' Likes');
		});
	});

	$('#addPost').on('submit', function(e){
		if (currentUser) {
			console.log('there is a currentUser!');
		} else {
			console.log('there is not a currentUser variable');
		}
		e.preventDefault();
		var text = $(this).find('textarea').val();
		var date = moment().format('MMMM Do YYYY, h:mm:ss a');
		var post = {
			date: date,
			text: text,
			likes: 0,
			userName: currentUser.name || user.name,
			userProfilePic: currentUser.profilePic || user.profilePic,
			user: currentUser._id || user._id
		};

		$.post('/api/addPost', post , function(responseData){
			console.log('addpost responseData: ', responseData.postId);
			post._id = responseData.postId;
			var outputHTML = compilePostTemplate(post);
			$('#post-container').prepend(outputHTML);
	
		});


		$('#addPost').css({display: 'none'});
		$('#dropNote').text('Drop a Note').removeClass('cancel').addClass('drop-note');
	});





});
