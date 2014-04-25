require.config({
	baseUrl : '/public/scripts/',
	paths : {
		"jquery" : "lib/jquery-2.1.0",
		"underscore" : "lib/underscore",
		"maths" : "modules/shimconfig/math"
	},

	shim : {
		"maths" :{
			exports : "mm"
		},
		"underscore" : {
			exports : "und",
			init : function() {
				und = this._;
			}
		}
	}
});

require(['jquery', 'maths', 'underscore'], function($, mm, und) {
	console.log(_);
	var math = new Maths();
	console.log(math.add(2,7));
});