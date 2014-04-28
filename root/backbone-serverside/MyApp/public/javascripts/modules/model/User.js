define(["jquery","backbone"], function($, Backbone){

	var User = Backbone.Model.extend({
		defaults : {
			username : "",
			email : "",
			fullname : "",
			age : "",
			location : "",
			gender : ""
		}
	});

	return User;

});