var myVar;
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

	// Test  something evaluates to true.
	describe("toBeTruthy - Matcher", function(){

		it("validating the boolean value", function() {
			expect(myObj.trueValue).toBeTruthy();
		});

		it("validating with some value", function() {
			expect(myObj.value).toBeTruthy();
		});

		it("validating with object", function(){
			expect({}).toBeTruthy();
		});

		it("validating with boolean", function(){
			expect(false).not.toBeTruthy();
		});
	});

	//Test something evaluates to false
	describe("toBeFalsy - Matcher", function(){

		it("validating with boolean", function(){
			expect(false).toBeFalsy();
		});

		it("validating with the null value", function(){
			expect(myObj.nullValue).toBeFalsy();
		});

		it("validating with the empty string", function(){
			expect(myObj.emptyString).toBeFalsy();
		});

		it("validating with the NAN value", function() {
			expect(0/0).toBeFalsy();
		});

		it("validating with the ZeroValue", function() {
			expect(myObj.zeroValue).toBeFalsy();
		})

		it("validating with undefined var", function(){
			expect(myVar).toBeFalsy();
		});
	});

	//Useful to reverse the matchers to make sure they aren't true.
	describe("not - Matchers", function(){

		it("Checking with Boolean value", function() {
			expect(true).not.toBeFalsy();
			expect(false).not.toBeTruthy();
		});

		it("validating the object", function(){
			expect(myObj.objOne).not.toBe(myObj.objTwo);
		});

	});

	//To check the particular element part of the result
	describe("toContain - Matchers", function(){
		
		it("Checking with the Array element", function() {
			expect([1,2,3,4]).toContain(2);
			expect(["ila", "mathi", "engineer", "single"]).toContain("single");
			expect([1,2,3,4]).not.toContain(5);
		});

		/*it("Checking with the object111", function() {
			var age = { age : "25"};
			expect(myObj.objOne).not.toContain(myObj.objOne);
		})*/

	});

	//To test something defined 
	describe("toBeDefined - Matchers", function(){

		it("Checking with the undefined var", function() {
			expect(myVar).not.toBeDefined();
		});

		it("Checking with the defined var", function(){
			expect(myObj.value).toBeDefined();
			expect("Hello").toBeDefined();
			expect(null).toBeDefined();
		})
	});

	//To test something not defined , just declared
	describe("toBeUndefined - Matchers", function(){

		it("Checking with the undefined var", function() {
			expect(myVar).toBeUndefined();
		});

		it("Checking with the defined var", function(){
			expect(myObj.value).not.toBeUndefined();
			expect("Hello").not.toBeUndefined();
			expect(null).not.toBeUndefined();
		});
	});

	//To test something is null
	describe("toBeNull - Matchers", function(){
		it("Checking with the null value", function(){
			expect(null).toBeNull();
			expect(false).not.toBeNull();
			expect(myVar).not.toBeNull();
		});
	});

	//To test something NAN
	describe("toBeNaN - Matchers", function(){
		it("Checking with different value", function() {
			expect(5).not.toBeNaN();
			expect(0/0).toBeNaN();
			expect(parseInt("Hello")).toBeNaN();
		});
		
	});

	//To test something is greater than or less than expected value, it works for string too
	describe("toBeGreaterThan, toBeLessThan - Matchers", function(){
		it("Checking with different possible value", function() {
			expect(8).toBeGreaterThan(5);
			expect(5).toBeLessThan(10);
			expect("a").toBeLessThan("b");
			expect("appa").toBeGreaterThan("amma");
		});
	});

	//To check if a number is close to another number, given a certain number of precision
	describe("toBeCloseTo - Matchers", function(){
		it("validating with different possibilities", function(){
			expect(12.34).toBeCloseTo(12.3, 1); // take only one decimal place
			expect(12.34).toBeCloseTo(12.34, 2); // take 2 decimal place
			expect(12.34).not.toBeCloseTo(12.3, 2); // take 2 decimal lace

			expect(19.999).toBeCloseTo(20, 0); //round the number to integer
			expect(500.0567).toBeCloseTo(500, 0); //round the number to integer
		});
	});
	
});