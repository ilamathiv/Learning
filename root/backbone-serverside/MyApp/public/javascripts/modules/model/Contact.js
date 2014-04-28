define(['jquery','backbone'], function($, Backbone){

	var Contact = Backbone.Model.extend({
		defaults : {
			photo : '/public/images/placeholder.png',
			name : '',
			address : '',
			tel : '',
			email : '',
			type : ''
		}
	});

	return Contact;

});