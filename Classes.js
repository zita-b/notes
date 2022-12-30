class Human {
  role = 'user'; //if you define properties outside of constructor
  //it will be added to new object created but not to the prototype?
  //i dont fucking now these explanations are terrible

  static count = 0;
  //static properties will not be in the object, dont ask me what the point of them is

  static increase() {
    this.count++; //static method, every time we call the function it increases
  }
  constructor(name, surname) {
    this.name = name; //we define properties inside constructor
    this.age = 0;
    this.surname = surname;
    Human.increase();//so function gets executed every time we create a new Human
    //we refer to Human instead of this because static method increase belongs
    //to the class (Human) and not the newly created objects(this)
  }


  celebrateBirthday() { //then methods still inside class
    this,age++;
    this.printInfo();
  };

  printInfo() {
    console.log(`${this.name} is ${this,age}`);
  };
}

const zita = new Human('Zita');
zita.celebrateBirthday();

console.log(Human.prototype) //this should show all available methods to
//your class + the constructor function

console.dir(Human)//log the class itself

//class inheritance

class User {
  //blabla
}

class Admin extends User {//inherits from class First (all properties and methods)
//you can reassign properties from User too if you want

constructor(name, surname) {
  super(name)

  this.surname = surname;
}//when we redefine the contstructor of an inherited class, we first need
//to call the original constructor

}

const john = new Admin('John', 'Smith')

//something about redefining methods with the super keyword,

//instanceof

console.log(zita instanceof Human)

console.log(john.__proto__.__proto__ === User.prototype); //true

