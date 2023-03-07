//Extras

//1.Type assertion

const field = document.getElementById('username') // HTMLelement or NULL


console.log(field.value) //this doesnt work in typescript

//we have to tell typescript what kind of element it is, we do that
//with TYPE ASSERTION

const field = <HTMLElement>document.getElementById('username')

//OR

const field = document.getElementById('username') as HTMLInputElement;

//type assertion is common when we receive some data from ther server or reading values
//because typescript has to know the type of the element


//2. Generic types

//GENERICS is the ability to pass a TYPE inside a FUNCTION

function get3Last<Items>(items: Items[]): Items[] {
  return items.slice(-3);
}

const numbers = [1, 2, 3, 4, 5];
const result = get3Last<number>(numbers); //so here we specify that its gonna be a numbers array


const chars = ['a', 'b', 'c', 'd', 'e'];
const result2 = get3Last<string>(chars);


//3. Creating a generic type

type Collection<T, P> = {
  items: T[];
  limit: P;
}

const items2: Collection<string, number> = {
  items: [],
  limit: 3,
}

const items3: Collection<number, number> = {
  items: [],
  limit: 3,
}
//Objects I guess?
//we can use the Colleciton type for both objects now and we don't
//have to create 2


//4. Utility types

//UTILITY TYPES allow us to create new types or interfaces based on already
//existing types

interface User {
  name: string;
  role: 'user' | 'admin';
  age?: number;
}

const newUser: Readonly<User> = {
  name: 'John',
  role: 'user',
  age: 29,
}// here we create another type based on User type but we can
//not modify the properties
newUser.age = 30//error, its read only

Partial<User> //every property is optional

Required<User> //all properties required, even the ones that were optional in the interface (age)

Pick<User, 'name' | 'role'> //specify which properties you wanna include from interface

Omit<User, 'name' | 'role'> //specify which ones not to include

//utility types for functions:

type Callback = {} => string;

const x: ReturnType<Callback> = '123';


