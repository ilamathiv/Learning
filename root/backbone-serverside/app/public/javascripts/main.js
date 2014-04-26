require.config({
	paths : {
		"jquery" : "lib/jquery-2.1.0",
		"underscore" : "lib/underscore",
		"handlebars" : "lib/handlebars-v1.3.0",
		"text": "lib/text",
		"backbone" : "lib/backbone",
		"model" : "modules/model",
		"collection" : "modules/collections",
		"view" : "modules/view"
	},
	shim : {
		"backbone" : {
			deps : ["jquery","underscore"],
			exports : "Backbone"
		},
		"underscore" : {
			exports : "_"
		},
		"handlebars" : {
			exports : "Handlebars"
		}
	}
});


require(['collection/Users', 'view/UserListView'], function(Users, UsersListView) {
	var users = new Users();
	var p = users.fetch();
	//window.coll = users;
	//window.view = UsersListView;
	p.done(function(){
		var usersListView = new UsersListView({
			collection : users
		});
	});
	
});