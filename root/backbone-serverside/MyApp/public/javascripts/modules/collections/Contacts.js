define(['jquery','backbone','model/Contact'], function($, Backbone, Contact) {
	var Contacts = Backbone.Collection.extend({
		model : Contact,
		url : 'contacts/contactlist'
	});

	return Contacts;
});