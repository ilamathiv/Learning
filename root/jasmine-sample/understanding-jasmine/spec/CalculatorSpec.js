describe("Sample Example", function(){
	beforeEach(function(){
	  obj = new Sample();
	});

	describe("Hello World", function(){
		it("says hello world", function(){
			expect(obj.helloWorld()).toEqual("Hello World!");
		});

		it("says world", function(){
			expect(obj.helloWorld()).toContain("World!");
		});

	});

	describe("Vowels Removing", function(){
		it("should remove all the lower case vowels", function(){
			expect(obj.disemvowel("hello world")).toEqual("hll wrld");
		});

		it("Should remove all the uppercase vowels", function(){
			expect(obj.disemvowel("Artistic Eagle")).toEqual("rtstc gl");
		});

		it("Shouldn't change the Empty string", function(){
			expect(obj.disemvowel("")).toEqual("");
		});
		it("Shouldn't change the string wothout the vowels", function(){
			expect(obj.disemvowel("Mhmm")).toEqual("Mhmm");
		});

	});		
});