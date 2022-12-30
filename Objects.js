//1.var let and const?? idk if this is still relevant

//you can NOT just initialize constants, you have to DECLARE them:

const co //--> Error

var a = 'var'
let b = 'let'
let c = 'const'

var a = 'var2' //var can be declared again, will be reassigned to last applied value
// --> you can NOT do this with let or const
// you also cant create a function with the same name

console.log(d) //--> error, hasnt been declared yet, dont ask me what happened to hoisting

let d = 'let'

if (true) {
  var f = "var"
  let g = "let"
}

console.log(f)
console.log(g) //--> ERROR because it was declared in a block obviously but it does
//work with var btw

//So a lot of stuff works with var but i guess you wouldnt use it anyways since its obsolete,
//except if you declare a var inside a function, then you cant access that either, just like let and const
//conclusion: var can be declared more than once and is accessible before declaration,
//also is available from inside and outside of the block {}, let isnt
//functions limit the accessibility regardless of special word (let or var)


//2.variables and references

const name = "Zita"
const age = 30

const object = {
  name: name,
  age: age
}  //--> so here because the variable name is the same as the key, we can do this instead>

const object2 = {
  name,
  age
}  //--> SAME

object2.name
object2.name = "Random name"

object2.newKey = "newValue" //--> JS goes inside the object, checks if newKey exists, if yes
//set its value to newValue, if not it creates it

//REFERENCE:
//reference is an assignment of variable to your object
const newObject = object2 // now newObject will contain a REFERENCE to our initial object
//you can access the same properties from referenced object as the initial one
console.log(newObject.name) //Random name

//.--> so we can access properties but WE DO NOT HAVE A NEW OBJECT
//we have 1 object, the initial one, and a reference
newObject.x = 'x' //--> both will be updated now with the new key, so I guess whatever you
//do tot the reference it will mutate the original object because thats what the reference does

//3.let vs const
//just because you assigned const to the object, you can still change the values because it will still be an object

//4.Object reference example

const friend = {
  name: 'John'
}

let guest = friend //--> here we passed in a value of the friend object in the guest variable, this is a reference to the original object

guest.name = 'Sherlock' //--> so by assigning Sherlock as the new value to the name key, we changed the original object as well

guest = null

console.log(friend.name) //--> Sherlock
console.log(guest) //--> NULL, we changed the name key and THEN assigned a null value to our guest reference, so the name still changed, even
//though after that we have set guest equal to NULL, name has already been changed so assigning NULL
//to the reference will not affect the changes already made to the original object


//5.Object in Chrome DevTools

//Chrome DevTools first displays a PREVIEW of the object
//a state of an object at the moment you log it
//if after logging you modified the values in your code, you can expand the little arrow
//and it will show you the changes
//when you try to access an object from inside Chrome DevTools, it will always show you the CURRENT state (with all latest modifications applied, so no preview)
//BUT if you update the object from inside the devtools, the previous logs wont change or update themselves automatically

const object3 = {
  count: 0
}

console.log(object3)

object3.count = 1


//6.Object comparison

const x = 5
const y = '5'

console.log(x === y) //STRICT EQUALITY FALSE
console.log(x == y) //LOOSE EQUALITY TRUE, performs type conversion

//same thing with OBJECTS:

const obj4 = {
  name: "name",
  number: 1
}

const obj5 = {
  name: "name",
  number: 1
}

console.log(obj4 === obj5) //FALSE, because even though the values are the same, these are 2 DIFFERENT OBJECTS (object, unlike primitive data types is an entire entity basically)
console.log(obj4 == obj5) //FALSE 

obj6 = obj5
console.log(obj6 === obj5) //TRUE, because it is the SAME OBJECT


//7.NULL vs UNDEFINED

const person = {
  name: "Joe",
  lastName: "Schmoe",
  cat: null
}

console.log(person.cat) //--> null because it exists but is equal to null (its value is null), if it didnt exist it would be undefined
//literally the property is not defined which is why its called undefined
//in VSC CTRL + SPACE lets you see the shortcut to ALL EXISTING PROPERTIES oj an object

//it is BEST PRACTICE to always ASSIGN INITIAL VALUES to object properties even if you dont know
//that value yet:

const anotherPerson = {
  name: "Joe",
  cat: null,
  age: 0, //we could use null but its better to use explicit data types that will be expected in the future
  jobTitle: '' //same
}


//8.Object relations example

const man = {
  name: "Pete",
  lastName: "Black",
  wife: null //woman after we assign it man.wife = woman
}

const woman = {
  name: "Kate",
  lastName: "White",
  husband: null //man after we assign it
}

man.wife = woman
woman.husband = man

man.wife.lastName = man.lastName

console.log(woman.lastName) //Black

//now if we change this to:
const man = {
  name: "Pete",
  lastName: "Black",
  wife: null
}
const woman = {
  name: "Kate",
  lastName: "White",
  husband: null
}

man.wife = woman
woman.husband = man

man.wife = {} //I dont think this is a reference here because we assign an 
//object to a key in another object so it doesnt change the original object (woman)
//THIS IS A NEW OBJECT HERE (instead of reference)

man.wife.lastName = man.lastName

console.log(woman.lastName) //White, so the soman object remained intact plus I think man object's wife is now an object with only 1 property (the previously empty object),
//lastName which is Black
console.log(man.wife) //{lastName: 'Black} yup

//conclusion Cross referenced objects?


//9.Object vs function

//differences between data types function and object
function sum(x, y) {
  return x + y
}

console.log(typeof sum)
console.log(sum)

sum() //call the function you can

sum.someProp = 123 //assign a property to the function
console.dir(sum) //--> now we can view the function as an object in devTools
//upon expanding it will show you the newly assigned someProp property as well which
//i dont know what the fuck it means to assign a property to a function or what the point of it is

const object5 = {
  x: 1,
  y: 2
}

object5.z = 3

console.log(typeof object5)
console.log(object5)

object() //this will NOT work, you cant call an object with a pair of parentheses DUH 

//CONCLUSION even though it displays similarly in devTools, you can not call an object with a pair of parentheses, also
//functions have ADDITIONAL SERVICE PROPERTIES (displayed ind devTools)
//you can access the additional service properties of functions by using the console.dir() method
//other than these functions behave similarly to objects which makes sense i guess since functions are also objects


//10.Objects as arguments

const pete = {
  name: 'Pete',
  lastName: 'Black',
  wife: null
}

const kate = {
  name: 'Kate',
  lastName: 'White',
  husband: null
}

function marry(man, woman) { //here, the argument man becomes a REFERENCE to our pete object once we pass in pete
  man.wife = woman
  woman.husband = man
}
//--> so when we pass objects to a function as parameters
//the references to those objects are passed and then the function will use
//its own internal variables that contain the reference to the original objects

marry(pete, kate)

console.log(kate.husband) //pete

//11. Object as argument example

const peter = {
  name: 'Peter',
  age: 23
}

function f(person) {
  person = null
}

f(peter)
console.log(peter) // OBJECT IS INTACT --> we only nulled the REFERENCE, not the original object

function g(person) {
  person.age++
}

g(peter)
console.log(peter) //--> this works, so you can work with object properties from within a function
//and it will change the original object


//12. Object destructuring

const longObjectName = {
  name: 'Pete',
  lastName: 'Black',
  age: 23,
  pet: 'cat'
}

//const agee = longObjectName.age
//const namee = longObjectName.name this is long, so learn destructuring
//DESTRUCTURING:

const { agee, namee } = longObjectName //this is supposed to be name and age btw its just somewhere earlier i used it in this file
//CTRL SPACE to access available properties
//CTRL D another shortcut for changing several instances of the same variable

if (agee > 20) {
  console.log(
    `${namee} ${agee} - 20 is ${agee - 20}`
  )
}


//13. DESTRUCTURING in params

const persona = {
  name: 'Pete',
  lastName: 'Black',
  age: 23,
  isMarried: false
}

printPersonInfo(persona)

function printPersonInfo (object) {
  const { name, lastName, age } = object
  console.log(`${name} ${lastName} is ${age} now`)
} //this is cool, but we can make it even shorter:

//destructuring right in the parameters:

function printPInfo ({ lastName, age, name }) { //order doesnt matter here, it will work the same, we are telling js our function expects an object as a parameter with these properties
  console.log(`${name} ${lastName} is ${age} now`)
}

//14. Destructuring details 

function printPI ({ name = '!!!', lastName: surname, age: x = 20 }) {
  console.log(`${name} ${surname} is ${x} now`)
}
//so what we did here was we provided ALIASES to the object properties and set DEFAULT values to them,
//so in case the value is not defined in the original object, we can work with the given default value
//inside the function, we can combine these practices and give both an alias and a default value
//to a property right inside the parentheses

//15. Copy an object

//How do you COPY (aka create an actual new object) an object instead of just referencing ti?

const personaa = {
  name: 'Pete',
  lastName: 'Black',
  age: 23,
  isMarried: false
}

const newObject = {}

for (const key in personaa) {
  newObject[key] = personaa[key]
}

newObject.age = 33 //now original object wont change because newObject is not a reference
//its another object

//we can make this shorter by using the SPREAD OPERATOR instead:

const anotherObject = { ...personaa} //we copied all the properties into a NEW object

const coordinates = {
  x: 3,
  y: 2
}

//with SPREAD, you can combine properties of MULTIPLE OBJECTS:
const object100 = {
  ...personaa,
  z: 11,
  ...coordinates,
  lastName: 'White'//we changed lastName property after destructuring the personaa object(...personaa) so we can easily change (reassign) any values here
} // this NEW object will now have all properties of both personaa and coordinates objects plus the property z which we added
//so conclusion destructuring is a very common way of creating new objects with properties of other objects


//16.Object.assign

//append properties to existing objects

const coordinates2 = {
  x: 3,
  y: 2
}

const z = {
  z: 1,
  addProp: '',
}

const t = { t: 1 }

Object.assign(coordinates, z, t) //first argument is always OBJECT TO BE CHANGED (the one you wanna add the new properties to)
//if one of the property names is the same it will be REASSIGNED so

const alter = { addProp: 'newValue'}
Object.assign(coordinates, z, t, addProp) // now addProp which was in const z will be the new value

//now if you put all this in a variable you will create a REFERENCE:
const object2000 = Object.assign(coordinates, z, t, addProp)

//to CREATE NEW OBJECT:
const object5000 = Object.assign({}, coordinates, z, t, addProp)
//add empty object as FIRST PARAMETER inisde object assign method -->
//this way the INITIAL OBJECT BEING CHANGED according to object.assign method will be
//a new, empty object and we append all the properties we want to this new object in the other arguments
//this is kindof an older method, SPREAD OPERATOR IS MORE COMMONLY USED NOW BECAUSE IT IS MORE SIMPLE