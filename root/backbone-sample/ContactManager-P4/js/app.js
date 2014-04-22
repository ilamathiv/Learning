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
		editTemplate : $("#contactEditTemplate").html(),

		events : {
			"click button.delete" : "deleteContact",
			"click button.edit": "editContact",
			"change select.type": "addType",
			"click button.save": "saveEdits",
			"click button.cancel": "cancelEdit"
		},

		deleteContact : function() {
			var removedType = this.model.get("type").toLowerCase();

			this.model.destroy();
			this.remove(); // removes the particular view from the html
			if (_.indexOf(directory.getTypes(), removedType) === -1) {
		        directory.$el.find("#filter select").children("[value='" + removedType + "']").remove();
		    }
		},

		editContact : function() {
			var tmpl = Handlebars.compile(this.editTemplate);
			this.$el.html(tmpl(this.model.toJSON()));

			var newOpt = $("<option/>", {
                html: "<em>Add new...</em>",
                value: "addType"
            });

            this.select = directory.createSelect().addClass("type").val(this.$el.find("#type").val()).append(newOpt).insertAfter(this.$el.find(".name"));
            this.$el.find("input[type='hidden']").remove();
		},

		addType : function() {
			if(this.select.val() === "addType"){
				this.select.remove();

                $("<input />", {
                    "class": "type"
                }).insertAfter(this.$el.find(".name")).focus();
			}
		},

		saveEdits: function (e) {
            e.preventDefault();

            var formData = {},
                prev = this.model.previousAttributes();

            //get form data
            $(e.target).closest("form").find(":input").not("button").each(function () {
                var el = $(this);
                formData[el.attr("class")] = el.val();
            });

            //use default photo if none supplied
            if (formData.photo === "") {
                delete formData.photo;
            }

            //update model
            this.model.set(formData);

            //render view
            this.render();

            //if model acquired default photo property, remove it
            if (prev.photo === "img/placeholder.png") {
                delete prev.photo;
            }

            //update contacts array
            _.each(contacts, function (contact) {
                if (_.isEqual(contact, prev)) {
                    contacts.splice(_.indexOf(contacts, contact), 1, formData);
                }
            });
        },

        cancelEdit: function () {
            this.render();
        },

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
			this.$el.find("#filter").append(select);
			this.on("change:filterType", this.filterByType, this);
			this.collection.on("reset", this.render, this);
			this.collection.on("add", this.render, this);
			this.collection.on("remove", this.removeContact, this);
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

		removeContact : function(removedModel) {
			var removed = removedModel.attributes;
			if (removed.photo === "img/placeholder.png") {
        		delete removed.photo;
    		}

			_.each(contacts, function(contact){
				if(_.isEqual(contact, removed)){
					contacts.splice(_.indexOf(contacts, contact), 1);
				}
			});
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