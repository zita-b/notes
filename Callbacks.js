//1. Function as a value

function add(a, b) {
  return a + b;
} // FUNCTION DECLARATION

const result = add(10, 5);

const multiply = function(a, b) {
  return a * b;
} // FUNCTION EXPRESSION (its called expression because we assign it to a variable)

const divide = (a, b) => a / b; // function declaration / arrow function

const result2 = function(a, b) {
  return a * b;
}(10, 5) //IMMEDIATELY INVOKED FUNCTION EXPRESSION lol
//function is called right after declaration with arguments after

//to make an arrow function immediately invoked function expression:
const result3 = ((a, b) => a / b)(10, 5)//nobody does this though

//more realistic example:

const operation = add;//this is good because you can just change 
//the assignment and it will still work (if the function exists) so for example"
// const operation = multiply;
const result4 = operation(10, 5)
//ultimate:

function calculate(callback) {
  const result4 = callback(10, 5) //if the original function here didnt have a return value (add for example) result would be UNDEFINED
  console.log(result4)
} // so when a function is passed as an argument inside another function,
// it is called a CALLBACK FUNCTION
// callbacks are very common

calculate(add)
calculate(multiply)
calculate(divide)


//2. Callback questions

function print(x) {
  console.log(x);
}

function test(f) { //function test accepts the callback function f
  f();
}

test(1)// this gives an ERROR because 1 is NOT A FUNCTION
test(print(1))// uncaught typeerror f is not a function -->
//this is because print function DOES NOT HAVE A RETURN VALUE
test(print)//UNDEFINED is logged

function test(f) {
  f(1); //this works now
}
test(print)


//3. Callback usage

const numbers = [10, 20, 30, 40]

function f(x) {
  console.log(x)
}
// --> change it to FUNCTIONAL EXPRESSION:
const f = (x) => {
  console.log(`${x} !!!`)
}

runForEach(numbers, f)

// now make it even shorter by passing the function right inside the function call:

runForEach(numbers, (x, index) => {
  console.log(`${x} -- ${index} !!!`)
})

function runForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i);
  }
}//logs 10 20 30 40


//4. Timers

//Callbacks in the context of delayed function execution

function f() {
  console.log('Callback executed')
}

console.log('Page loaded')

setTimeout(f, 2000) //native javascript function, parameters: a function, number of milliseconds to delay execution with
//-->
setTimeout(() => {
  console.log('Callback executed')
}, 2000) //it is a callback function so we can just paste the whole function in the arguments
//of the other function that calls it to make it shorter

//to keep executing timeout function use:

setInterval(() => {
  console.log('Callback executed')
}, 2000) // now this EXECUTES EVERY 2 SECONDS continuously
//to stop the execution of setinterval: 
// use CLEARINTERVAL
//for clearinterval to work though setinterval has to be assigned to a variable

const interval = setInterval(() => {
  console.log('Callback executed')
}, 2000);

clearInterval(interval) //now we are passing in the ID of out setinterval function to clear it,
//clearinterval is also a built in javascript function
//this now stops setinterval from executing AT ALL
//so to let setinterval execute and THEN clear it when we want to, we need to use:
setTimeout(() => {
  clearInterval(interval);
}, 5000) //now it will clear the interval after 5 seconds so it will execute twice before its cleared
//timeouts and intervals are not very commonly used in real life but we still need to learn them