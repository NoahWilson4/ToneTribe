$(document).on('ready', function(){


////////// posts ////////

	var postTemplate = $('#post-template').html();
	var compilePostTemplate = Handlebars.compile(postTemplate);

	$.get('/api/getAllPosts', function(posts){
		console.log('posts: ', posts);
		////need to limit viewing with infinite scrolling 
		posts.posts.map(function(post){
				var outputHTML = compilePostTemplate(post);
				$('#post-container').prepend(outputHTML);
			});
	});


/////////////// submitting posts  ///////////////
// $(document).on('click', '.drop-note', function(){
// 		console.log('click');
// 		$('#addPost').css({display: 'inherit'});
// 		$('#dropNote').text('Cancel').addClass('cancel').removeClass('drop-note');
// 	});

// 	$(document).on('click', '.cancel', function(){
// 		$('#addPost').css({display: 'none'});
// 		$('#dropNote').text('Drop a Note').removeClass('cancel').addClass('drop-note');
// 	});
	

	// $('#addPost').on('submit', function(e){
	// 	e.preventDefault();
	// 	var text = $(this).find('textarea').val();
	// 	var date = moment().format('MMMM Do YYYY, h:mm:ss a');
	// 	var post = {
	// 		date: date,
	// 		text: text,
	// 		likes: 0,
	// 		userName: user.name,
	// 		userProfilePic: user.profilePic,
	// 		user: user._id
	// 	};

	// 	$.post('/api/addPost', post , function(responseData){
	// 		console.log('addpost responseData: ', responseData);
	// 	});

	// 	var outputHTML = compilePostTemplate(post);
	// 	$('#post-container').prepend(outputHTML);

	// 	$('#addPost').css({display: 'none'});
	// 	$('#dropNote').text('Drop a Note').removeClass('cancel').addClass('drop-note');
	// });







});
