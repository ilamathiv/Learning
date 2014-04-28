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


require(['collection/Contacts', 'view/ContactListView'], function(Contacts,ContactListView) {
	var contacts = new Contacts();
	mainView = new ContactListView({ collection : contacts});

});