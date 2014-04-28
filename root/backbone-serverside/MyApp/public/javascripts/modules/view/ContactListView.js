define(['jquery','backbone','view/ContactView'], function($,Backbone,ContactView){

	var ContactListView = Backbone.View.extend({
		el : $('#contacts'),

		events : {
			'click #showForm' : 'addContact'
		}

		initialize : function() {
			var self = this;
			this.collection.fetch({
				success : function() {
					var select = self.createSelect();
					self.$el.find("#filter").append(select);
					self.render();
				}
			})
		},
		render : function() {
			var self = this;
			$(this.collection.models).each(function(index,item){
				var contactView = new ContactView({
					model : item
				});
				self.$el.append(contactView.render().el)
			});
		},

		getTypes : function() {
			return $.unique(this.collection.pluck("type"));
		},

		createSelect : function() {
			select = $('<select/>', { html : "<option value='all'>All</option>"});
			$.each(this.getTypes(), function(index, item){
				$('<option/>', {
					value : item.toLowerCase(),
					text : item.toLowerCase()
				}).appendTo(select);
			});
			return select;
		}
	});

	return ContactListView;

});