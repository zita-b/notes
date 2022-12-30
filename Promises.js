//1. Sync vs async code

function getAdvice(name) {
  const language = prompt('Please enter a language');

  return `${name} suggests to learn ${language}`
}// this is SYNCHRONOUS CODE which means
//BLOCKING CODE ==> while prompt is waiting for your answer, you can see 
//page is constantly loading, because FURTHER CODE WILL NOT EXECUTE
//until previous one has (returned?/executed?  --> until it 'gets a response' he says)

const advice = getAdvice('Mary')
console.log(advice)

const field = document.querySelector('.field')
const button = document.querySelector('.button')

function getAdvice(name) {
  let language;

  button.addEventListener('click', () => {
    language = field.value;//this code is EXECUTED ASYNCHRONOUSLY
  })//DOESNT BLOCK THE EXECUTION OF THE REST OF THE CODE
  //EXECUTES SEPARATELY

  return `${name} suggests to learn ${language}`
}//this code is ASYNCHRONOUS, we will get:
//Mary suggests to learn undefined, because the return and log
//and everything else EXECUTES WITHOUT us CLICKING THE BUTTON
//and thus having a value for language

//to fix this so we dont get undefined:

function getAdvice(name, callback) {
  button.addEventListener('click', () => {
    const language = field.value;

    callback(`${name} suggests to learn ${language}`)
  });
}

const callback = (advice) => {
  console.log(advice)
}

getAdvice("Mary", callback)
//now we will only log when the button was clicked and we have a value


//2. Why callback is not convenient
//in the previous lesson we fixed the code so it only logs when we have a value
//despite being asynchronous, but its not the best solution

//create new promise
//promise accepts resolver function with 2 functions as arguments accept and reject
//PROMISE can only be RESOLVED ONCE
//if we wanna work with the promise we have to CREATE A NEW PROMISE

promise.then(
  function(result) { /* handle a successful result */ },
  function(error) { /* handle an error */ }
);

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));

new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

}); //PROMISE CHAINING

//Returning promises allows us to build chains of asynchronous actions.