//1.Object Method

function sayHello() {
  console.log('Hello')
}

const person = {
  role: 'user',
  age: 23,
  objectMethod: sayHello //if a function is stored inside an object as a property, it is called
  //OBJECT METHOD
  //if you add parentheses here, 
  //it will execute inside the object immediately not returning anything because the function itself doesnt have a return value
  //so it will become undefined (i guess it will be converted to its return value after execution
  //which in this case is undefined)
  //so to use it as a method, remove parantheses and just use the function name (if you wanna store the function itself instead of just the return value in any case)
}

person.objectMethod() //still gotta add the parantheses here, now it executes

//we can also create this function right inside the object:

const person2 = {
  role: 'user',
  age: 23,
  objectMethod: function () { //we dont need a function name anymore because we dont refer to it
    console.log('Hello')
  }
}

const person3 = {
  role: 'user',
  age: 23,
  objectMethod: function () {
    console.log(this) //when writing a function inside of an object, you can use the THIS special word
  }//inside an object method, the keyword this will return the OBJECT ITSELF
}
//ALSO, you can access any other property of the object itself with this from inside the object method:
const person4 = {
  role: 'user',
  age: 23,
  objectMethod() { //you can also remove function and the colon to make it even shorter, it will work the same
    console.log(`${this.role}: ${this.age}`)
  }//log: user: 23
}

//2. Object methods this example

function printFullName(user) {
  console.log(`${user.firstName} ${user.lastName}`);
}

const user1 = {
  firstName: 'Name1',
  lastName: 'Surname1',
  print: printFullName
}

const user2 = {
  firstName: 'Name2',
  lastName: 'Surname2',
  print: printFullName
}

user1.print(user1)
user2.print(user2) //this works, but is not best practice because we have to duplicate
//user1 user2 and like what if we make a typo or something, so better way:

function printFullName() {
  console.log(`${this.firstName} ${this.lastName}`);
} // using this is a great way to avoid having to pass in any parameters
// the function is reusable and then we can just make it an object method and call it that way:

user1.print()
user2.print()


//3. Computed property(getter)

//A GETTER is a computed object property

const user3 = {
  firstName: 'Name',
  lastName: 'Surname',
  fullName: 'Name Surname'
}

user.firstName = 'Joe'

console.log(user.fullName)// this logs 'Name Surname' because changing firstname
//wont affect fullname property, so to have fullname automatically change when we change firstname:

const user4 = {
  firstName: 'Name',
  lastName: 'Surname',
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  } //computed property syntax, get + getter
  //the explanation here got a little shitty, but so basically by using the getter
  //fullName will be computed automatically plus we dont need to call it 
  //with parentheses? or something like that, i guess cuz its already inside the object
  //so fullName becomes a property (instead of an object method) is my guess
}

user.firstName = 'Joe'


//4. Computed property(setter)

const user5 = {
  firstName: 'Name',
  lastName: 'Surname',
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }// fullname is the computed property here
}

user.fullName = 123// we can NOT REASSIGN a computed property THIS WAY (it will still be name surname)
// --> if we USE STRICT, we will even get an error (TypeError)

const user6 = {
  firstName: 'Name',
  lastName: 'Surname',
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  },
  
  set fullName(value) { //setter must have a parameter
    if (typeof value !== 'string') {
      return // we can do a validation here inside the setter
    }

    const index = value.indexOf(' ')
    const firstName = value.slice(0, index)
    const lastName = value.slice(index + 1)//to not include the space
    this.firstName = firstName
    this.lastName = lastName
  }
}

user.fullName = 'John Smith' //log John Smith