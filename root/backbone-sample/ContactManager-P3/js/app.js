(function($) {


	var contacts = [
		{ name: "Contact 1", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 2", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 3", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
        { name: "Contact 4", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
        { name: "Contact 5", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 6", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
        { name: "Contact 7", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
        { name: "Contact 8", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" }
	];


	var Contact = Backbone.Model.extend({
		defaults: {
			photo : "img/placeholder.png",
			name : "",
			address : "",
			tel : "",
			email : "", 
			type : ""
		}
	});



	var Directory = Backbone.Collection.extend({
		model : Contact
	});


	var ContactView = Backbone.View.extend({
		tagName : 'article',
		className : 'contact-container',
		template : $("#contactTemplate").html(),

		render : function() {
			var tmpl = Handlebars.compile(this.template);
			this.$el.html(tmpl(this.model.toJSON()));
			return this;
		}
	});

	var DirectoryView = Backbone.View.extend({
		el : $('#contacts'),

		events: {
    		"change #filter select": "setFilter",
    		"click #showForm" : "showForm",
    		"click #add" : "addContact"
		},

		initialize : function() {
			this.collection = new Directory(contacts);
			this.render();
			var select = this.createSelect();
			console.log(select);
			this.$el.find("#filter").append(select);
			this.on("change:filterType", this.filterByType, this);
			this.collection.on("reset", this.render, this);
			this.collection.on("add", this.render, this);
		},

		render : function() {
			this.$el.find("article").remove();
			var self = this;
			_.each(this.collection.models, function(item){
				self.renderContact(item);
			}, this);
		},

		renderContact : function(item) {
			var contactView = new ContactView({
				model: item
			});
			this.$el.append(contactView.render().el);
		},

		getTypes : function() {
			return _.unique(this.collection.pluck("type"), false, function(type) {
				return type.toLowerCase();
			});
		},

		createSelect: function () {
		    var filter = this.$el.find("#filter"),
		        select = $("<select/>", {
		            html: "<option value='all'>All</option>"
		        });
		 
		    _.each(this.getTypes(), function (item) {
		        var option = $("<option/>", {
		            value: item.toLowerCase(),
		            text: item.toLowerCase()
		        }).appendTo(select);
		    });
		    return select;
		},

		setFilter: function (e) {
		   // this.filterType = e.currentTarget.value;
		   // this.trigger("change:filterType");
		   contactsRouter.navigate("filter/" + e.currentTarget.value, {trigger: true});
		},

		filterByType: function () {
		    if (this.filterType === "all") {
		        this.collection.reset(contacts);
		        //contactsRouter.navigate("filter/all");
		    } else {
		        this.collection.reset(contacts, { silent: true });
		 
		        var filterType = this.filterType,
		            filtered = _.filter(this.collection.models, function (item) {
		            return item.get("type").toLowerCase() === filterType;
		        });
		 
		        this.collection.reset(filtered);
		        //contactsRouter.navigate("filter/" + filterType);
		    }
		},

		addContact : function(e) {
			e.preventDefault();
			var newContact = {};
			$("#addContact").children("input").each(function(index, element) {
				if($(element).val() !=""){
					newContact[element.id] = $(element).val();
				}
			});

			contacts.push(newContact);

			if(_.indexOf(this.getTypes, contacts.tyoe) === -1) {
				this.collection.add(new Contact(newContact));
				this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
			} else {
				this.collection.add(new Contact(newContact));
			}

		},

		showForm : function() {
			this.$el.find("#addContact").slideToggle();
		}

	});

	var ContactsRouter = Backbone.Router.extend({

        routes: {
            "filter/:type" : "urlFilter"
        },

        urlFilter: function (type) {
            directory.filterType = type;
            directory.trigger("change:filterType");
        }
    });

	var directory = new DirectoryView();

	var contactsRouter = new ContactsRouter();

	Backbone.history.start();

})(jQuery);