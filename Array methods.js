//1. Array splice

//splice is a MUTATING METHOD (it changes the initial array)
const numbers = [0, 1, 2, 3, 4, 5]

numbers.splice(2)

//RETURNS the leftover numbers in the array (the ones that were not cut, so in this case
// 2, 3, 4, 5)

numbers.splice(2, 2, ) //cut 2 from index 2 and replace them with 3 0s
//spliced: 2, 3
//remaining: 0, 1, 0, 0, 0, 4, 5
//so the original array will be changed and splice returns the cut numbers, both can be worked with


//2. Array reordering

//REVERSE METHOD is also a MUTATING method (changes the initial array)
numbers.reverse()//5, 4, 3, 2, 1, 0

numbers.sort()//SORTS in ASCENDING order, MUTATING, returns the sorted array
//TAKES ARRAY ELEMENTS AS STRINGS!! so:
numbers = [0, 1, 2, 3, 19, 4]
numbers.sort()//--> 0, 1, 19, 2, 3, 4 based on character codes by default, to change this:
//sort by numbers --> pass in CALLBACK FUNCTION:
numbers.sort((a, b) => a - b)


//3. Array fill

//fill fills all the elements with the given value:
numbers.fill('Hi')//Hi, Hi, Hi, Hi, Hi, Hi

numbers.fill('Hi', 3)//--> starting from index 3 start replacement (inclusive)
//0, 1, 2, 'Hi', 'Hi', 'Hi'

numbers.fill('Hi', 3, 5)//--> until index 5 exclusive
//0, 1, 2, 'Hi', 'Hi', 'Hi', 5

//fill is good when you wanna fill fixed length arrays:
const numbers2 = Array(10).fill(1) //an array of 10 elements
//1, 1, 1, 1, 1, 1, 1, 1, 1, 1


//4. Array join and split

//join: convert an array to a string, split: convert string to array
const string = 'a four word string'
const words = string.split(' ', 2)//first parameter is the DELIMITER, second totally optional is how many elements your array will include
//[a, four]
//if you pass in a number as the second argument which is larger then length of array,
//automatically all parts of string will be included in the array
string.join(' ')//parameter is delimiter, will join elements by delimiter
//up to this point these were all MUTATING METHODS
//MUTATING ARRAY METHODS: (changing the original array)
numbers.push(123, 456)
numbers.pop()
numbers.unshift(789, 123)
numbers.shift()
numbers.splice(3, 1, 'abc')
numbers.reverse()
numbers.sort()
numbers.fill(999)


//5. Array non-mutating methods

//return the result WITHOUT CHANGING the original ARRAY
const result = numbers.includes(1) // true
const result2 = numbers.indexOf(1) // 1
const result3 = numbers.lastIndexOf(1) // 4
const result4 = numbers.join('---') // 3---1--5--2-1-4 I dont really understand it but it was among the examples
const result5 = numbers.slice(1, -1) // 1, 5, 2, 1 start inclusive end exclusive new array
const result6 = numbers.concat(1, 2, 3, ['a', 'b']) //adds these elements to the end of the array
//if you pass in another array as an arguments, elements will be FLATTENED (array destructured) and added to the end as well
// if you use PUSH, array will be added as a NESTED ARRAY instead

//6. Array copy

//how to create a copy of an array
const numbers7 = [1, 2, 3, 4]

const copy = numbers7 //REFERENCE TO THE ORIGINAL ARRAY

copy.push(111)

console.log(numbers7) //1, 2, 3, 4, 111
//--> A NEW ARRAY WAS NOT CREATED, SAME AS WITH OBJECTS, WE JUST REFERENCED IT AND
//BY MUTATING THE REFERENCE WE MUTATED THE ORIGINAL ARRAY AS WELL!

//SO TO ACTUALLY CREATE A NEW ARRAY:
const copy2 = numbers7.slice()//without parameters to just copy
//OR
const copy3 = numbers7.concat()//without parameters to just copy
//OR
const copy4 = [...numbers7]//spread operator, take all the elements from numbers7 array and copy them into this new array
//OR
const copy5 = Array.from(numbers7)//same as spread
//YOU CAN ALSO ITERATE THROUGH THE ARRAY TO CREATE A COPY


//7. Array destructuring

//destructuring is used when you need to target certain elements of an array
//to interact with them
const numbers8 = [1, 2, 3, 4, 5]

const [a, b, c] = numbers8

console.log(a, b, c)// 1, 2, 3, first 3 elements of the array

const [d, , f] = numbers8 //this will now skip the second element and target frist and third
//you can skip as many as you want
const [, , g, , , , k] = numbers8

const [ l, ...rest] = numbers8 //take first and group all the rest in an array with the rest operator
//REST OPERATOR can be called anything it doesnt need to say 'rest' ...b for example
//REST has to be the LAST element though when you are DESTRUCTURING otherwise you'll get an error

f([1, 2, 3, 4, 5])

function f(array) {
  const [ a, , ...b] = array //function to destructure array into first element, second skipped, all the rest in a new array
  console.log(a, b)
}

//you can DESTRUCTURE right inside PARAMETERS

g([1, 2, 3, 4, 5], 'string')

function g([a, , ...b], x) {
  console.log(a, b, x)
}
//conclusion: array destructuring is good for targeting certain elements when you are working with arrays