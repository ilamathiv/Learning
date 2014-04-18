describe("Sample Example", function(){
	beforeEach(function(){
	   myObj = sampleData;
	});

	//toEqual - simply check the two things are equal, irrecpective of different object
	describe("toEqual-Matcher", function(){
		it("validating the Boolean", function(){
			expect(myObj.trueValue).toEqual(true);
		});

		it("validating the String Value", function(){
			expect("hello").toEqual("hello");
		});

		it("validating the Array", function(){
			expect(myObj.arrayValue).toEqual([1,2,3,4]);
		});

		it("validating the object", function(){
			expect(myObj.objOne).toEqual(myObj.objTwo);
		});

		it("validating the emptyString", function(){
			expect(myObj.emptyString).toEqual("");
		});

		it("validating the null", function(){
			expect(myObj.nullValue).toEqual(null);
		});

	});

	//toBe - Checks two things are equal and same time two things are belongs to the same object(reference)
	//It going to be same as js '===' operator'
	describe("toBe-Matcher", function(){

		it("validating the Boolean", function(){
			expect(myObj.trueValue).toEqual(true);
		});

		it("validating the String Value", function(){
			expect("hello").toEqual("hello");
		});

		it("validating the object", function(){
			expect(myObj.objOne).toBe(myObj.objOne);
		});

		it("validating the Array", function(){
			expect(myObj.arrayValue).toBe(myObj.arrayValue);
		});

		/* This two fails, eventhough value same but different object
		it("validating the object", function(){
			expect(myObj.objOne).toBe(myObj.objTwo);
		});

		it("validating the Array", function(){
			expect(myObj.arrayValue).toBe([1,2,3,4]);
		});
		*/

	});
	
});