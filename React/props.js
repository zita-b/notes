//1. Props basics

//App.jsx:
import React from 'react';
import './App.scss';
import './Message.scss';

function f() {

}

function App() {
  return (
    <div className = 'App'>
      <h1>Hello World!</h1>
      <Message text='Hello' x='1' y='0'/> {/*here we are CALLING THE COMPONENT and PASSING ATTRIBUTES*/}
      {/*inside props we can pass ANY VALUE so number object function etc*/}
      {/*also this jsx expression is basically a FUNCTION that we CALL and PASS PARAMETERS TO*/}
      <Message text='Goodbye'/>
      {/*this will compute to an OBJECT with properties so you can access and handle properties accordingly*/}
      {/*if you wanna pass a value that is NOT STRING, you need to use a JAVASCRIPT EXPRESSION*/}
      <Message
        x = {1 + 2}
        items = {[1, 2, 3]}
        callback = {() => {}}
        anotherCallback = {f}
        {/*so again all of these are going to be PROPERTIES of the PROPS OBJECT*/}
      />
    </div>
  );
}
//PASSING ARGUMENTS INSIDE OF COMPONENTS:
function Message(props) {{/*here we ACCEPT those ATTRIBUTES, by convention named props as in properties*/}
  return (
    <div className = 'Message'>
      {props.text}{/*props is an OBJECT*/}
    </div>
  );
}

export default App;
//...


//Props destructuring

//App.jsx:
import React from 'react';
import './App.scss';
import Product from './Product'

function App() {
  return (
    <div className = 'App'>
      <h1>Mate Academy</h1>
      <Product
        title={'Peperoni pizza'}
        price={100}
      />

      <Product
        title={'Water'}
        price={0}
        description={'Sparkling water'}
      />

      <Product
        title={'Chocolate cake'}
        price={30}
        description={'Chocolate cake'}
      />
    </div>
  );
}

export default App;

//Product.jsx:
import React from 'react';
import './Product.scss';

function Product({
   title,
   price = 0,
   description = 'no description',
}) { {/*here we are DESTRUCTURING out props*/}
  return (
    <div className = 'Product'>
      <h2 className = 'Product__title'>
        {title}{/*this would be props.title if we werent destructuring upon receiving the props as a parameter to our function*/}
      </h2>

      <div className = 'Product__price'>
        Price: {price}
      </div>

      <p className = 'Product__description'>
        {description}
      </p>
    </div>
  )
}

Product.defaultProps = { //also an OBJECT, we can specify DEFAULT PROPERTIES with defaultProps property of component
  price: 0,
  description: 'no description',
}//up to you if you wanna set DEFAULT PROPERTIES while DESTRUCTURING (at accepting attributes) OR use defaultProps

export default Product;


//propTypes

//if we wanna specify what properties the function should have:
//TERMINAL:
npm i prop-types
//to install prop-types LIBRARY FOR TYPE CHECKING

//Product.jsx:
import PropTypes from 'prop-types';

//after defaultProps if you have them or if not just below Product function:
Product.propTypes = {//this is an OBJECT
  title: PropTypes.string.isRequired,//if you wanna make it a required property use isRequired then if no title it warns you
//(in App when you try calling Product without a title, so this is good for not accidentally leaving out properties
//because without this we COULD call PRODUCT from App WITHOUT a title for example)
  price: PropTypes.number,//we have defined default price so no point making it required
  description: PropTypes.string,
}
//for OBJECTS of a CERTAIN SHAPE: PropTypes.shape({object specs, like prop1: PropTypes.number etx}), you can find it in the documentation somewhere,
//but basically with PropTypes.shape, we can say we expect an object and then DEFINE the PROPERTIES of that object as well
//PropTypes.arrayOf(PropTypes.number for example) for ARRAYS


//Create a folder per component

//inside src: create FOLDER COMPONENTS
//inside components: Product folder, inside Product folder put: Product.jsx, Product.scss
//now in App.jsx update the import of Product:
//first, because we dont want to write components/Product/Product cuz it sucks:
//BY DEFAULT, react will look for an INDEX file(a file named index), so:
//inside PRODUCT FOLDER, create a file name index.jsx
//inside index.jsx (inside Product folder):
//import Product from './Product'
//export default Product
//index in this case will be a UTILITY FILE
//now back to App.jsx we can finally update Product import properly:
//import Product from '../Product'
//and this will work because again react will go into Product folder and automatically
//look for index file which it finds, and there we import Product file and export it back
//now do the same with APP, inside components create App folder place App.jsx App.scss inside
//inside App folder create index.jsx, import export App
//update App import in src/index.js (btw i just realized the main index file is index.JS not JSX):
//import App from './components/App
//the point of all this is SHORTER IMPORT PATHS


//Named export

//a different way to export:
//in App.jsx, remove export default App
//refactor App function to an ARROW FUNCTION and export at declaration:
export const App = () => {//this is NAMED EXPORT
  //...
}//this way we are EXPORTING AN OBJECT, so:
//inside index.jsx in App: 
import { App } from './App' //we are DESTRUCTURING the imported OBJECT here
export { App }
//now index.js (the main file where we import App) same:
import { App } from './components/App'

//now instead of all this we just learned, we can do:
//App index.jsx:
export * from './App' // and here we dont need import i dont know why
//index.js stays same, destructuing App

//with destructuring we can IMPORT MULTIPLE ITEMS from one FILE:
//inside App.jsx we can create a variable:
export const x = 1;
//index.js:
import { App, x } from './components/App'
//inside Product if we wanna use it
import { x } from '../App'

//named export is when you write export before the element you wanna export upon declaration


//Conditional Rendering

export const App = () => {
  const name = '';
  
  if (name.length > 30) {
    return (
      <p>{'The name is too long. Sorry :('}</p>
    );
  }

  return (
    <div className='App'>
      <h1>
        {name ? (
          `Hello, ${name}!`
        ) : (
          'Please, log in'
        )}{/*we can use ternary inside the element itself*/}

        <p>Selected user: {name || 'no user'}</p>{/*if no name we return no user*/}

        {/*or we can also do:*/}
        {/*if name (jsx ignores falsy values, so if no name, empty string, name is returned, but HTML wont display empty string)*/}
        {name && (
        <> {/*fragment because we return 2 elements*/}
          <span>***</span>
          <span>*123</span>
        </>
        )}
      </h1>
    </div>
  )
}