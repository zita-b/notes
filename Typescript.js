// @ts-check
//you have to install typesrcipt with npm, rename typescript file to .ts, then compile, then add --watch
//so that it generates the javascript automatically, then the browser will interpret the javascript
//1. Any and primitive types
var value; //--> type: any because it hasnt been assigned yet, we can assign any value to iy
var value;
value = 123;
value = '123'; //ERROR, because it is a number type
//ERROR EIS GONNA BE IN THE EDITOR, THERE WILL BE NO ERROR
//IN THE BROWSER, ALSO THE JS FILE
//THAT GETS CREATED AFTER COMPILING THE TYPESCRIPT FILE WILL CHANGE
//THE VARIABLE TO VAR FOR COMPATIBILITY WITH OLDER BROWSERS ( I DONT KNOW WHY THIS ISNT A PROBLEM
//WITH REGULAR JAVASCRIPT THEN)
var age = 29; //type is already number here because typescript assigns a type when we assign a variable
var firstName = 'John'; //string
var isMarried = false; //boolean
var wife = null; //type here is ANY because it is equal to null
var empty = undefined; //type ANY
var wife = null; //ERROR
var empty = undefined; //ERROR
var wife; // variable doesnt have a value yet but it will be of type string, good for validation 
//and return values and shit i guess
wife = 123; //ERROR, it is supposed to be string
var wife; //this is fine but if you do this in the future wife can only be null
var empty; //same
var age = 29; //idk whats the point of this but ok
var firstName = 'John';
var isMarried = false;
//so if we dont set type, type is INFERRED FROM THE DATA TYPE we assign the
//variable to by typescript, until then its ANY
//long form: let firstName: string = 'John' he admitted it was unnecessary!
//2. Add types to a function
function add(x, y) {
    return x + y;
}
var result1 = add(3, 5);
console.log('3 + 5 =', result1);
//define function RETURN TYPE:
function add(x, y) {
    return x + y;
}
//give types to parameters:
function add(x, y) {
    return x + y;
}
function add(x, y) {
    if (x > 3) {
        return; //now that we added this, return type can be number OR undefined
    }
    return x + y;
}
function add(x, y) {
    if (x > 3) {
        return; // now this will show an error, because it is supposed to be a number and it is undefined now
    }
    return x + y;
}
//arrow functions:
var multiply = function (x, y) {
    return x * y;
};
//this is long and annoying, so:
var cube = function (x) { return x * x * x; }; //this for typescript means that cube is a function with a number parameter that returns a number
//(x: number) => number this part
//this is still too long, but we can MOVE THE TYPE INTO A SEPARATE VARIABLE
type = Callback = function (x) { return number; }; //SPECIAL TYPESCRIPT TYPE
var cube = function (x) { return x * x * x; };
//this function will be of type callback now
//3. Void and never
//functions that do not have a return value are also called PROCEDURES
function sayHiTo(name) {
    console.log('hello'); //return type is void
} // so with void type we can either
//return nothing (procedure) OR UNDEFINED
//type never: code after it is unreachable
function fail() {
    throw new Error('Error!');
} //never also doesnt have a return type, we use it for functions that throw an error
fail();
console.log(123); // this will not execute it is even grey
//4. Optional arguments
function add(x, y) {
    if (!y) {
        return x;
    }
    return x + y;
}
//you can do this OR
function add(x, y) {
    if (y === void 0) { y = 0; }
    if (!y) { // = 0 added to the optional parameter because otherwise if there is no parameter it would be undefined and then that would also show error because number + undefined cant be number type
        return x;
    }
    return x + y;
}
console.log(add(3, 5), add(3) //this would show error, because add function expected 2 parameters (before i added the question mark)
);
