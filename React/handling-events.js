//1. How to handle events in react

export const App: React.FC = () => {
  const saveHandler = () => {
    console.log('Saved')
  }
  return (
    <div className="App">
      <h1>Mate academy</h1>

      <button type="button" onClick={saveHandler}>
        Save
      </button>
{/* for onclick event handler we pass the function, we can either create
an arrow function separately */}
      <button 
        type="button"
        onClick={() => {
          console.log('Canceled')
        }}
      >{/* or use a function literal right inside onclick */}
        Cancel
      </button>
    </div>
  );
}
//of course there are many other evetn handlers besides onclick


//2. Method with arrow function

//lets rewrite this to class component

type State = {
  status: string;
}

export class App extends React.Component<{}, State> {
  //if no props we can just use empty object
  state = {
    status: '',
  }

  saveHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    console.log('Saved')
    console.log(event.nativeEvent)
    //react WRAPS MOUSE EVENT in a synthetic event wrapper
    //use .nativeEvent to access the javascript event
    this.setState({ status: 'Saved' });//change state with handler
    //but you can use it to interact with props as well
  };//arrow function

//if we used CLASS METHOD INSETAD OF ARROW FUNCTION this would be UNDEFINED
//i think we would have to bind it

  render() {
    const { status } = this.state;
  
    return (
      <div className="App">
      <h1>{`Mate academy ${status}`}</h1>

      <button type="button" onContextMenu={this.saveHandler}>
        Save
      </button>

      <button 
        type="button"
        onClick={() => {
          console.log('Canceled')
          this.setState({ status: 'Canceled' })
        }}
      >
        Cancel
      </button>
    </div>
    )
  }
}


//3. Custom arguments in an event handler

saveHandler = (event: React.MouseEvent, message: string) => {
  console.log(event.clientX, event.clientY, message)
};

<button
  type="button"
  onClick={(event) => {
    this.saveHandler(event, 'Hello')
  }}//passing in additional arguments,
//we have to create a wrapper arrow function because react only passes in the event
//by default
>
  Save
</button>

//we dont have to pass in the event at all btw,
//it gets passed automatically, we can just pass the additional arguments
onClick={() => {
  this.saveHandler('Hello')
}}


//4. Using event in async callback (event.persist())

saveHandler = (event: React.MouseEvent) => {
  setTimeout(() => {
    console.log(event);
  }, 3000);
}
//before you used to have to call event.persist() in
//async functions(because of the synthetic react wrapper around
//the event handler, the event would not persist by default),
//now this works without that so you dont have to use event.persist() anymore
//since verison 17, you can simply PASS THE EVENT IN THE ASYNCHRONOUS CALLBACK


//5. Handling events in a list

type State = {
  words: string[];
}

export class App extends React.Component<{}, State> {
  state = {
    word: ['one', 'two', 'three', 'four', 'five']
  }

  handleClick = (word: string) => {
    console.log(word);
  };

  render() {
    const { words } = this.state;

    return (
      <div>
        <ul>
          {words.map((word) => {
            <li
              key={word}
              onClick={() => {
                this.handleClick(word)
              }}
            >
              {word}
            </li>
          })}
        </ul>
      </div>
    )
  }
}
