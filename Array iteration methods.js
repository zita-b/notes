//1. Array forEach

const numbers = [10, 20, 30, 40]

numbers.runForEach = function(callback) {
  console.log(this)

  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
}

const f = (x) => {
  console.log(x);
}

numbers.runForEach(f)

//paste function body right inside function call:

numbers.runForEach((x, index, array) => {
  console.log(x, index, array)
}) //this is how these array methods work basically
//this is literally the same as forEach now
//these built in functions are good because they also process index and array


//2. Array filter

const numbers2 = [1, 3, 4, 6, 9, 4]

function isLessThanFive(x) {
  return x < 5;
}

numbers.filter = function(callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

const result = numbers.filter((x) => {
  return x < 5;
})

console.log(numbers)
console.log(result)


//3. Array map

//performs an action on every element of the array
//similar implementation as filter
//returns new array just like previous ones

const names = ['Joe', 'Sherlock', 'Pete'];

function getNameLength(name) {
  return name.length;
}

const result2 = names.map(getNameLength);

console.log(names)//['Joe', 'Sherlock', 'Pete']
console.log(result)//[3, 8, 4]

//replace name of the callback function with itself:
//we dont need function name and function keyword
//convert to arrow function
//when arrow function ONLY RETURNS (no other operation) we can remove the curly braces and the return keyword
const result3 = names.map((name) => name.length) //this is called IMPLICIT RETURN (not using return keyword) other is explicit


//4. Array some and every

//soem returns truthy value if it finds an array element the callback function is true for
//every checks all elements

const result = names.some((name) => name.length > 3)
//for EMPTY ARRAY returns FALSE
const result = names.every((name) => name.length > 3)
//for EMPTY ARRAY returns TRUE
//thats because its looking for a false value and cannot find one because the array is empty


//5. Some and every to break the iteration

//find, findIndex, reduce..


//9. Reduce to an object

const users = [
  { name: 'User1', age: 23 },
  { name: 'User2', age: 25 },
  { name: 'User3', age: 27 },
];

let result4 = {};

for (const user of users) {
  result4[user.name] = user.age;
}

console.log(result4)//{User1: 23, User2: 25, User3: 27}

//now same with reduce:
const callback = (prev, user) => {
  return {
    ...prev,
    [user.name]: user.age,
  }
};
//to make this even shorter:
const callback2 = (prev, user) => ({ ...prev, [user.name]: user.age });
//its kinda hard to tell whats happening here though so he agrees the longer version of this
//is better, and he said just use for loop if it is shorter instead of reduce on the object


const result5 = users.reduce(callback, {})


//sort
//MUTATES!!
//sorts elements in place and returns the sorted array

strings.sort((a, b) => a.localeCompare(b)); //this (instead of (a - b) sorts lower and uppercase
//words as well as special characters in the right order!
//regular a - b sorts special characters at the end and i think uppercase 
//letters at the beginning of the array

//13. Sort a copy

//sort is a mutating method, so if you wanna SORT a COPY without
//changing the original array:
//you can just use SPREAD OPERATOR AND DESTRUCTURING:

const result6 = [...numbers].sort((a, b) => a - b)

result6 === number //false now
//with REACT, it is very important to work with COPIES instead
//of the original array because the react applcation might 
//MISBEHAVE if you change the original array


//14. Sort objects

//sort an array of objects
//i guess it only works if these objects share a key name
const objects = [
  { name: 'Pete', age: 23},
  { name: 'Pete', age: 46},
  { name: 'Pete', age: 68},
  { name: 'Pete', age: 32},
];

objects.sort((a, b) => a.age - b.age);//sorts objects by value (number, ascending order)

console.table(objects) //this is pretty cool, displays a table with 
//the object array's data in the developer tools console

//we can SORT by STRINGS instead if we want:
objects.sort((a, b) => a.name.localeCompare(b.name))
//plus you can sort any other way you want basically you can just write your own
//logis but these are the more popular ones


//15. Bubble sort algorithm theory

//Bubble sort iterates through an array of elements in loops
//the loop starts again IF AT LEAST ONE REORDERING HAPPENED DURING THE PREVIOUS LOOP
//the final loop will be the one when no reordering happens anymore (so it knows every element has been sorted already)


//16. Array sort implementation

const numbers = [14, 3, 11, 5, 2];

function compareAsStrings(a, b) {
  a = String(a);
  b = String(b);

  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return 0;
}

numbers.sort = function(callback = compareAsStrings) { 
  let count;

  do {
    count = 0;

    for (let i = 1; i < this.length; i++) {
      const prev = this[i - 1];
      const current = this[i];

      if (callback(prev, current) > 0) {
        count++;
        this[i - 1] = current;
        this[i] = prev;
      }
    } 
  } while (count > 0)

  return this;
}

const result8 = numbers.sort((a, b) => a - b);