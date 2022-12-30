//5. Advanced types

//Union types

let result: string | number | boolean = f('Zita')//it can be either
//this is called a UNION TYPE (can be 2 or more types)
type = ProductId = string | number;

let result: ProductId | boolean = f('Zita') //you can do this too

function f(name: string | number): ProductId {
  if (typeof name !== 'string') {
    return name //we added this so its fine now
  }
  if (name.length > 3) {
    return name; //if you only have this there is an error because
    //.length doesnt exist on numbers
}

//literal types
let pizzaSize = 'small' | 'medium' = 'small' //this is called a LITERAL TYPE
//it measn pizzasize can only be small or medium

type PizzaSize = 'small' | 'medium'

let pizzaSize2:PizzaSize = 'small'

//Array types

type ProductId = string | number;
const item1: ProductId[] = [1, 2, 'hello'] //for arrays, but we dont need to specify
//the type if we dont want to, just like with variables, as we fill it up it will infer the types
const item2: Array<ProductId> = [1, 2, 'hello'] //this is another syntax for array elements type

const item3: [number, number, string] = [1, 2, 'hello']
//this is called a TUPLE, we can set which element will be of which type in order

//Typescript compiler options

//tsc filename.ts --watch 
//this is how you compile ts files 
// --noEmitonError key 
//javascript recompiles after adding the watch key every timw you change something
//regardless if you ave errors in your typescript file, so 
//--noEmitonError can be added to prevent this, this way JS file
//wont be recompiled as long as you have an error in your TS file
// --> tsc app.ts --watch --noEmitonError
//there are some methods that have been added into later scripts
//for example .includes()
//if you wanna use those, you have to go into the tsconfig.json file
//and add the lib it belongs to (ES2016)for includes
//so in this case in your config file you would write at the top under CompilerOptions:
//"lib": ["ES2016", "DOM"]; //dom is for browsers you gotta add that too it says
//after this JS still wasnt compiled with config file therefore shows an error in the terminal
//tsc -p app.ts ./tsconfig.json (p for project) to compile it with configurations
//we still need to go back inside config file under CimpilerOptions: ==> 
"files" {
  "./app.ts"
}
//we ncan also add watch and noemittoerror inside compileroptions at the bottom:
"watch": true,
"noEmitOnError": true
//--> now you can COMPILE WITH tsc -p filename ./tsconfig.json
//--> the compiled JS file will use var, this is because of
//target es5 in configoptions in the json
//we can change this to "ESNext" which will let us use the latest features
//he changed it back to es5 because he wants to make sure older browsers support our js so var is better
//Objects


//Classes

//classes in typescript are different from javascript classes
class Point {
  constructor(x: number, y: number) {
    this.x = x;//error, property type x doesnt exist
    this.y = y;
  }
}

class Point {
  age = 0; //here we dont have to define type because we instantiated the property with a number type value so it will be inferred
  private x: number;//now its ok (not because of the public though)
  y:number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;//these are the properties we pass to the constructor
  }


  print() {
    console.log(`x: ${this.x}, y: ${this.y}, age: ${this.age}`)
  } //class METHOD
}

//we can also:
constructor(
  public x: number; //this is how we INSTANTIATE PROPERTIES he says
  public y: number) {}
//now we dont have to define type at the top OR inside constructor

const a = new Point(1, 2)

a.print();

console.log(a.x)//error, because a is private (only accessible within the class)
//by default, ALL THE PROPERTIES AND METHODS OF THE CLASS ARE PUBLIC
//x could also be:
protected x: number; //PROTECTED CAN ONLY BE USED INSIDE OF THE CLASSS
//JUST LIKE PRIVATE PLUS IN CLASSES THAT INHERIT FROM IT

//interface

function print2DINfo(point: PointIn2D) { //we are using the CLASS AS A TYPE HERE
  console.log(`x: ${point.x}, y: ${point.y}`)
}

interface PointIn2D {
  x: number; //this is alike  aliteral type for classes that implement 
  y: number;//this interface, now class Point MUST have these properties
}

class Point implements PointIn2D {

}


//ABSTRACT class and INHERITANCE

extends //--> same as implements but for another class

//super keyword for something he didnt fucking explain

//abstract ==> you can NOT INSTANTIATE anymore if you
//use abstract like:
abstract class Point2D
//you can ONLY EXTEND (so you cant use new keyword)
//suoper keyword is for calling the properties you want to extend-->
