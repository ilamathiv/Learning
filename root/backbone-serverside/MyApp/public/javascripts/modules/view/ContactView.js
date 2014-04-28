define(['jquery','backbone', 'handlebars', 'text!/views/contact-template.html'], function($,Backbone,Handlebar,contactTemplate){

	var ContactView = Backbone.View.extend({
		tagName : 'article',
		className : 'contact-container',
		template : contactTemplate,

		render : function() {
			var tmpl = Handlebar.compile(this.template);
			this.$el.html(tmpl(this.model.toJSON()));
			return this;
		}
	});

	return ContactView;

});