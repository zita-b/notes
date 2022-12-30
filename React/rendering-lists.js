//1. Rendering a list from an array

//App.jsx:
import React from 'react';
import './App.scss';

const items = [1, 2, 3, 4, 5];

export const App = () => {

  return (
    <div className='App'>
      <h1>Mate academy</h1>
      <ul>
        {items.map(item => (
          <li key={item}> {/*each element of lists in react needs a unique key for identification by react*/}
            {item}
            <span>*</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


//2. Rendering products as a list

//we will basically do the same thing but with an array of objects
//App.jsx:

import React from 'react';
import './App.scss';
import { number, string } from 'prop-types';

const items = [
  {id: 1, name: 'Potato'},
  {id: 2, name: 'Apple'},
  {id: 3, name: 'Pear'},
  {id: 4, name: 'Cucumber'},
  {id: 5, name: 'Tomato'},
];

export const App = () => {

  return (
    <div className='App'>
      <h1>Mate academy</h1>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            {' - '}
            {item.id}
          </li>
        ))}
      </ul>
    </div>
  );
}


//3. How to split a list into components

//we will take our product items list and break the code into components

const dataFromServer = [
  {id: 1, name: 'Potato'},
  {id: 2, name: 'Apple'},
  {id: 3, name: 'Pear'},
  {id: 4, name: 'Cucumber'},
  {id: 5, name: 'Tomato'},
];

export const App = () => {
  return (
    <div className='App'>
      <h1>Mate academy</h1>
      <ProductList products={dataFromServer}/>
    </div>
  );
}

//component for ul:
const ProductList = ({ products }) => (
  <ul>
    {products.map((product) => (
      <li key={product.id}>
        <Product {...product}/>
      </li>
    ))}
  </ul>
)

//component for list item:
const Product = ({ id, name }) => (
  <>
    <strong>{name}</strong>
    {' - '}
    {id}
  </>
)


//4.Extracting components using VSCode

//if you select a component, right click then REFACTOR
//or CTRL SHIFT R and then select move to a new file
//we still have to create directories for the files that react created for us
//and update import exports (because of the new folders we created)
//for the mock data that would be coming from a server in real life
//he created a data folder with a JSON file and put it there
//JSON rules: keys in double quotes, no semicolon, no last comma
//then import JSON in App


//5.propTypes validation with eslint

//i dont think we have to do this because its already installed
//plus we will be using typescript anyways


//6.add typescript

//same, its already going to be installed in the project
//if you use typescript you DONT NEED PROPTYPES
//files need to be named TSX instead of JSX
//he renamed index.js to tsx too not ts i dont know why
//now for the ts itself:

//ProductList.tsx:
interface ProductItem {
  id: number;
  name: string;
}

type Props = {
  products?: ProductItem[];
}

export const ProductList: React.FC<Props> = ({ products = [] }) => ()
//we have given a default empty array to products in case it doesnt exist
//remove proptypes and import proptypes
//FC stands for functional component, <> is generic

//Product.tsx:
type Props = {
  id: number;
  name: string;
};

export const Product: React.FC<Props> = 
//rename proptypes we dont need them anymore

//also, starting from version 17? i think REACT IS AVAILABLE GLOBALLY
//which means we dont need to import react in every file
//so you can remove that too


//7.Do not spread data into component props

//aka DONT DESTRUCTURE PROPS

//inside src create new directory types
//new file Product.ts:
//move ProductItem interface there, export
//ProductList: import ProductItem from new file
//Product.tsx: remove Prop types, change it to ProductItem
//in generic and import

//Product.tsx:
type Props = Pick<ProductItem, 'color' | 'name'>
//he changed id to color
//change it to Props in generic as well

//Product.ts:

interface Color {
  id: number;
  name: string;
  hex: string;
}

export interface ProductItem {
  id: number;
  name: string;
  color: Color;
}

//now because of some explanation everything we just did was fucking shit so instead:
//Product.tsx:
type Props = {
  name: string;
  color: string;
}
//remove import ProductItem

//ProductList.tsx:
<Product
  color={product.color}
  name={product.name}
/>
//now we can see an ERROR that color is not the right type, and
//this is why its ok to duplicate the Props type?
//because we are warned about this now


//8. How to use react.FC

//inside individual folders, you can create index.ts instead of index.tsx
//because we just import export there anyways
//new types folder inside src, then new file for type
//write interface there for components and export from there
//he's always naming his type Props
//so again the idea is:

//inside component file tsx
import { Color } from '../../types/Color';

type Props = {
  primaryColor: Color;//Color is an object, has its own type in another fiel
  secondaryColor: color;
}

export const Theme: React.FC<Props> = ({
  primaryColor,
  secondaryColor,
}) => (
  //...
)

//so when giving TYPES TO FUNCTIONAL COMPONENTS, we create TYPE PROPS,
//define the type there, then pass in props as REACT.FC GENERIC to the function component


//9. Classnames

//classnames library, npm install classnames
//import cn from 'classnames;
//we can pass classNames as OBJECTS with the help of this library
//and then set it to true or false, so with this we can easily
//add several classnames to elements

const colorId = 3;//specify which element we wanna apply
//our extra class to, this is the id of the element

//return ...
<li
  key={color.id}
  style=({ color: color.hex })
  className={cn(
    'ColorsList__item',//this class is added to ALL ITEMS
    {
      active: color.id === colorId,//active class will only be added if color.id equals to colorId (otherwise it will add an empty string as className btw so nothing)
    },
  )}
>
  {color.name}
</li>

//npm i @types/classnames
//now classnames library will also perform type checking??
//fuck this is way too much for one lesson
//classnames library allows us to specify classNames in a more convenient way if we have a condition