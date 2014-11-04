module.exports = {
	login: function(req, res){
		if(req.isAuthenticated()){
			res.redirect('/');
		} else {
			res.render('cover', {title: 'Tune In'});
		}
	},
	loginSuccess: function(req, res){
		res.redirect('profile-user');
	},
	logout: function(req, res){
		req.logout();
		res.redirect('/login');
	},
	ensureAuthenticated: function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect('/login');
	},
	ensureAuthenticatedAjax: function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		res.send(401);
	}
}