//1. useState basics

import React, { useState } from 'react';

export const CounterFunction: React.FC = () => {
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(100);

  return (
    <>
      <h2>CounterFunction - {value} - {count}</h2>

      <button type="button" onClick={() => setValue(10)}>10</button>
      <button type="button" onClick={() => setValue(20)}>20</button>
      <button type="button" onClick={() => setValue(30)}>30</button>

      <button type="button" onClick={() => setCount(10)}>Count 10</button>
    </>
  )
}


//2. useState with a functional updated

//if you need to UPDATE A VALUE based on the PREVIOUS VALUE (like adding 1 to previous value,
//not just setting the value to a number regardless of what its value was before you know)
//you need to PASS IN A FUNCTION so you can specify PREVIOUS VALUE as a PARAMETER
//and then reference that parameter in the function body to calculate new value

export const CounterFunction: React.FC = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(current => current + 1);//so here if we just said setCount(count + 1) for example, only 1 would be added to count
    setCount(current => current + 1);//because all three calls to setCount are executed synchronously and the value of count would always be 0
    setCount(current => current + 1);//React doesnt keep track of the previous value (well current value at the time of executing this) unless we tell it to
  };

  return (
    <>
      <h2>Count: {count}</h2>

      <button type="button" onClick={() => increase()}>++</button>
    </>
  );
};


//3. useEffect basics

//we need to use special useEffect hook to be able to work with component lifecycle methods in functional components

//App.tsx
import { ChildClass } from './ChildClass';

export const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h2>Count: {count}</h2>
      <button
        type="button"
        onClick={increase}
      >
        ++
      </button>

      {(count % 5 > 0) && (
        <ChildClass />
      )}
    </>
  );
};

//ChildClass.tsx
export class ChildClass extends React.Component {
  componentDidMount() {
    console.log('Mounting...');
  }

  componentDidUpdate() {
    console.log('Updating...');
  }

  componentWillUnmount() {
    console.log('Unmounting...');
  }

  render() {
    console.log('Rendering');

    return (
      <h2>Child class</h2>
    );
  }
}

//lets try to implement the same functionality using a FUNCTIONAL COMPONENT:

//ChildFunction.tsx
import { useEffect } from 'react';

export const Child: React.FC = () => {
  useEffect(() => {
    console.log('effect');

    return () => {//COMPONENTWILLUNMOUNT behaviour --> to achieve that, RETURN A FUNCTION
      console.log('unmounted');//this will be called BEFORE the component is unmounted
    }
  }, []);//useEffect is a function that ACCEPTS A CALLBACK
//if we pass in a DEPENDENCY ARRAY as a second argument, the hook will
//behave like COMPONENTDIDMOUNT (will be called once upon rendering)
//without the dependency array by default it acts like componentdidmount + componentdidupdate
//so it gets called every time the component is rendered
  console.log('Rendering');

  return (
    <h2>Child value</h2>
  );
};


//4. useEffect with dependency array

//App.tsx
import React, { useState } from 'react';
import { UserDetails } from './UserDetails';
import './App.scss';

export const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  return (
    <>
      <button
        type="button"
        onclick={increase}
      >
        {count} ++
      </button>

      <h2>Select a user</h2>

      <button type='button' onClick={() => setUserId(1)}>
        User 1
      </button>

      <button type='button' onClick={() => setUserId(2)}>
        User 2
      </button>

      <button type='button' onClick={() => setUserId(3)}>
        User 3
      </button>

      <button type='button' onClick={() => setUserId(0)}>
        Clear
      </button>

      {(userId > 0) && (
        <UserDetails userId={userId} />
      )}
    </>
  );
}

//userDetails.tsx
import { useEffect } from 'react';

type Props = {
  userId: number;
};

export const UserDetails: React.FC<Props> = ({ userId }) => {
  useEffect(() => {
    console.log('mounted');

    return () => {
      console.log('unmounted');
    };
  }, []);

  useEffect(() => {
    console.log(`Loading user ${userId} ...`);
  }, [userId]);//this effect now will only execute again if userId changed

  console.log('rendering');

  return (
    <h2>User {userId}</h2>
  );
};
