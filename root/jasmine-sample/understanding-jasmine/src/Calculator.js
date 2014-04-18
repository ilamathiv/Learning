
var Sample = function() {

	this.helloWorld = function() {
		return "Hello World!";
	};

	this.disemvowel = function(str) {
		return str.replace(/a|e|i|o|u/ig, "");
	}


}
