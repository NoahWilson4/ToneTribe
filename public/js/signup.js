$(document).on('ready', function() {


	$('.sidebar-list-text').append('<input type="text" class="add-new-word editing-profile edit" placeholder="Add New...">');
//// add new item 
	$(document).on('blur', '.add-new-word', function(){
			console.log('find id...');
			var val = $(this).val();
			var attr = $(this).closest('p').attr('name');
			console.log('val: ', val);
			$(this).closest('.sidebar-list-text').append('<div class="words editing-profile edit">' + $(this).val() +'</div>');
			$(this).closest('.sidebar-list-text').find('.words').last().append('<button class="btn btn-default btn-xs delete-word">X</button>');
			$(this).closest('.sidebar-list-text').append('<input type="text" class="add-new-word editing-profile edit" placeholder="Add New...">');
			$(this).remove();
	});

//////// delete item
	$(document).on('click', '.delete-word', function(){
			// var val = $(this).closest('.words').text().split(',').shift().split('X').pop();
			var val = $(this).closest('.words').text();
			var attr = $(this).closest('p').attr('name');
			console.log('val delete', val, attr);
			$(this).closest('.words').remove();
			//// ajax request here
			
	});

})