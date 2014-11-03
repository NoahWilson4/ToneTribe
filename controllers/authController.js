// module.exports = {
// 	login: function(req, res){
// 		if(req.isAuthenticated()){
// 			res.redirect('profile-user');
// 		} else {
// 			res.render('cover', {title: 'Tune In'});
// 		}
// 	},
// 	loginSuccess: function(req, res){
// 		res.redirect('profile-user');
// 	},
// 	logout: function(req, res){
// 		req.logout();
// 		res.redirect('/cover');
// 	},
// 	ensureAuthenticated: function(req, res, next){
// 		if(req.isAuthenticated()){
// 			return next();
// 		}
// 		res.redirect('/cover');
// 	},
// 	ensureAuthenticatedAjax: function(req, res, next){
// 		if(req.isAuthenticated()){
// 			return next();
// 		}
// 		res.send(401);
// 	}
// }