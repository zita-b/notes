//1. Class components with TS

import React from "react"
import { Props } from "./rendering-lists"

type Props = {
  colors: Color[]
}

type State = {
  colorId: number
}

export class ColorsList extends React.Component<Props, State> {
  state = {
    colorId: 2,
  }
  render() {
    return (
//...
this.props.whatever
this.state.whatever
    )
  }
}


//2. setState

//updating the html
//react only updates components if the parent component or inner state changes
//component lifecycle methods to change anything in state

componentDidMount //called after initial render of the html

//if we wanna change something in our state and re render the html
//we have to use setState method (comes from React.Component)

type Props = {}//empty Props

type State = {
  x: number;
  y: number;
};

export Class App extends React.Component<Props, State> {
  state = {
    x: 0,
    y: 123,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ x: 5 });
    }, 1000);
  }//componentDidMount is for CHANGING the STATE ONCE after rendering

  render() {
    return (
      <div className = "App">
        <h1>
          {`X = ${this.state.x} Y = ${this.state.y}`}
        </h1>
      </div>
    );
  } 
}

//so we NEED to LET REACT KNOW that something in our states have changed
//and it needs TO RERENDER THE PAGE
//we do this with setState


//3. State and props destructuring

render() {
  const { x, y } = this.state; //if we do this we can just refer
  //to x as x etc

  const { a } = this.props; //same

  return (
    //...
  )
}


//4. Component lifecycle methods

componentDidUpdate() {

}
//NOT called after INITIAL render only on subsequent ones
//so if you change something with timeout for example or events i guess

componentDidMount() {

} //called ONCE after initial render

componentWillUnmount() {

}

//5. React developer tools
//its a chrome extension you should install
//developer tools => components
//there you can see the component tree, props and states and all that