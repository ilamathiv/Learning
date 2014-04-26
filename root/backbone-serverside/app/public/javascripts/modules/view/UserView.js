define(['backbone','handlebars','text!/views/user-template.html'], function(Backbone, Handlebars, template){

	var UserView = Backbone.View.extend({
		tagName : 'li',
		template : template,
		render : function() {
			var tmpl = Handlebars.compile(this.template);
			this.$el.html(tmpl(this.model.toJSON()));
			return this;
		}
	});

	return UserView;

});