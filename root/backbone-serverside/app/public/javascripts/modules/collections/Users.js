define(['jquery', 'backbone', 'model/User'], function($,Backbone, User){
	var Users = Backbone.Collection.extend({
		model : User,
		url : '/users/userlist'
	});

	return Users;
});