define(['backbone','underscore','view/UserView','collection/Users'], function(Backbone, _, UserView, Users){

	var UsersListView = Backbone.View.extend({
		el : $('#user-list-container'),
		initialize : function() {
			var self = this;
			/*this.collection.fetch({
  				success: function(collection, response) {
   					self.render();
  				}
			});*/
	self.render();
		},

		render : function() {
			_.each(this.collection.models, function(item){
				this.renderUsersList(item);
			}, this);
		},

		renderUsersList : function(item) {
			var userView = new UserView({
				model: item
			});
			this.$el.append(userView.render().el);
		}
	});

	return UsersListView;

})