//1. Global variables and Global object

console //this is a global variable as well for example
//global variables are created before the main script is executed by javascript
//when a webpage loads, js first creates a GLOBAL OBJECT
//that contains a LIST OF GLOBAL VARIABLES and then executes the main script
//the GLOBAL OBJECT is accessible in the BROWSER under the WINDOW name

console.log(window)// if you log the window object you will see
//all the built in methods and variables but CHROME DEV TOOLS
//DOESNT SHOW CONSOLE VARIABLE when you log window object
//but its there and you can access it by:

console.log(window.console)// this will also show you all the
//service methods console has

//GLOBAL OBJECT and SCRIPT OBJECT
//you can see these in devtools
//script object ==> if you add a debugger to the code
debugger;
//--> sources tab, you will see script and global,
//expand script and there you will see the LOCAL VARIABLES
//local variables that you have created in your code, they are not global
//like the variables inside window object
//variables with VAR and FUNCTIONS in your script automatically become part of the global object
//they are GLOBAL VARIABLES unlike let and const variables in your script

//Javascript reads the SCRIPT OBJECT FIRST, and then the GLOBAL OBJECT, so:

let console = 11;
console.log(console)//error, log is now 11, doesnt have log method

window.console.log(console)//works, output 11


//2. Lexical Environment
//chromedevtools debugger ==> BLOCK and LOCAL OBJECTS (next to script and global)
//if statements etc are going to be in BLOCK and functions in LOCAL
//this is called a LEXICAL ENVIRONMENT
//lexical environment is an object that contains
//the local variables of a block or function
//before ECMA2015? blocks were not limiting the VISIBILITY OF VARIABLES
//therefore, with VAR variables will be accessible in the entire SCRIPT (OBJECT) PLUS GLOBAL OBJECT ACTUALLY
//(even if they were declared inside blocks)
//NOT FUNCTIONS tho because functions were always
//limiting the visibility of variables, even before let and const
//FUNCTION VISIBILITY IS ALSO LIMITED BY BLOCKS (obviously)
//so a function declared inside a block wont be accessible outside of it
//so function local variables are only accessible within function itself,
//regardless of var let const, even other functions etc


//3. Closure
//CLOSURE is a FUNCTION, and all EXTERNAL VARIABLES available to that function
//JS first looks for VARIABLES inisde the SCOPE where FUNCTION BODY IS,
//not where it was CALLED!!

let f;
const a = 1;

if(true) {
  const a = 2;//this

  f = () => {//is
    console.log(a);//our
  }//CLOSURE here, aka the function itself and the external (not inside the function itself)
  //variables available to that function
}

if (true) {
  const a = 3;

  f();//log: 2!!! because JS finds value of a in the SCOPE where
}//the FUNCTION BODY is contained BEFORE it does in the scope where funcrtion was CALLED FROM


//4. Function in a loop

let i = 0;

while (i < 3) {
  let a = i;//if we didnt create this new variable inside the lexical environment
//of the function, we would log 3, 3, 3 3 times insetad of 0, 1, 2
  const f = () => {
    console.log(a)
  };

  setTimeout(f, 1000);

  i++;//that is because there is a timeout, so by the time the function is set to execute
}//i is already 3 because the loop already executed 3 times
//but a is in the block scope and not the script scope

//all functions have a property SCOPES, you can find this inside devtools debugger too
//same thing with for loop: it would work with let (just i not using a)
//with var we would be logging 3-s only because var is automatically global scoped so again,
//by the time we start the function execution because of the delay,
//i would be 3 in the global scope


//5. Function in a function


//What does f()() mean?

function add(a) {
  return function(b) {
    return a + b;
  }
}

const result = add(2)(3)//5because we pass in 2 then the inner function
//accepts the 3 as a parameter

//Save data in a closure

function createRecorder(owner) {
  let text = '';

  return (...args) => {
    if (args.length > 0) {
      text += args[0];
    }

    return `${owner} recording: ${text}`;
  }
}

const myRecorder = createRecorder('Roman');

myRecorder(undefiend); //this works too because we are checking args length, so we can even pass in
//undefined to the inner function now if we wish to do so

myRecorder('This ')
myRecorder('is a first ')
myRecorder('recording')

let result2 = myRecorder()//current state of concatenated string
console.log(result2) //Roman recording: undefinedThis is a first recording
//something about saving data in the closure of the function?

//now lets try to add a RESET method to this same code
//it will reset the string to an empty string once called and then
//we can add more strings again if we want to
//if no parameter is passed to function then the function parameter is udnefined

function createRecorder(owner) {
  let text = ''; //and text here is the common variable in a closure for our 2 inner methods

  const recorder = (phrase = '') => {
    text += phrase;

    return `${owner} recording: ${text}`;
  }//now recorder is an OBJECT that contains a function

  recorder.reset = () => {
    text = '';
  } //here we are just adding another attribute to the recorder object
//this will set text to an empty string aka resets it
  return recorder;
}//myRecorder and myRecorder.reset here share a COMMON CLOSURE,
//they were both created upon firstncalling the outer function (createRecorder)

myRecorder.reset()
myRecorder('Hello')


//9. Array of functions

function createTeam(size) {
  const team = [];
  let playerNumber = 0;

  while (playerNumber < size) {
    const ownNumber = playerNumber;//we need this to be able to increase playerNumber from 0 otherwise it would be a variable
    const player = () => console.log(//not in the inner scope and we would keep logging the last iteration number again
      `${ownNumber} is playing`
    );//again, if we were using for loop, we would have an inner, incrementable variable,
    //so we souldnt need ownNumber and set it equal to playernumber just playerNumber!!
    //but because we are using a while loop, playerNumber is outside the block? scope of the while loop

    team.push(player)
    playerNumber++;
  }
  //implementation to add players to the team
  return team;
}

const myTeam = createTeam(3);

const player0 = myTeam[0];
const player2 = myTeam[2];

player0();
player2();

//FUNCTION has INNER and OUTER variables
//in FOR loops the iterator belongs to the INNER scope
//NESTED FUNCTIONS are common in javascript
//nested functions can ACCESS the OUTER VARIABLES
//if a nestedfunction is RETURNED, it will have access to the same outer variables where the function body is no matter where you call it from

function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2

//LEXICAL ENVIRONMENT IS AN OBJECT TOO
//When the code wants to access a variable – the inner Lexical Environment
//is searched first, then the outer one, then the more outer one and so on until the global one.
//all functions have the hidden property named [[Environment]],
//that keeps the reference to the Lexical Environment where the function was created