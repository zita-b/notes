//1. useReducer
import { useState, useReducer } from 'react'

const [state, _setState] = useState({
  obj1: 1,
  obj2: 2
})

function setState(newState) {
  _setState(oldState => {
    return {
      ...oldState,
      ...newState
    }
  })
}

//==

function randomFunction(state, step) {
  return state + step
}

function App() {
  const step = 15

  const [counter, setCounter] = useReducer(randomFunction, 10)

  return (
    <div className="App">
      <h1 onClick={() => setCounter(step)}>Counter: {counter}</h1>
    </div>
  )
}

export default App

//dispatcher (redux-like)
function randomFunction(state, action) {
  switch(action.type) {
    case 'INCREMENT_STEP': {
      return {
        ...state,
        step: state.step + action.payload
      }
    }
    case 'INCREMENT_COUNTER': {
      return {
        ...state,
        counter: state.counter + state.step
      }
    }
    default: {
      throw new error('action not found')
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(randomFunction, {
    counter: 0,
    step: 1
  })

  function increment() {
    dispatch({ type: 'INCREMENT_STEP', payload: 1 })
  }

  function decrement() {
    dispatch({ type: 'INCREMENT_STEP', payload: -1 })
  }

  function increaseCounter() {
    dispatch({ type: 'INCREMENT_COUNTER' })
  }

  return (
    <div className="App">
      <h1 onClick={increaseCounter}>Counter: {state.counter}</h1>
      <h2>Current step: {state.step}</h2>
      <button onClick={increment}>
        Increase
      </button>
      <button onClick={decrement}>
        Decrease
      </button>
    </div>
  )
}

export default App


//2. Context API (useContext)

//create a context
//Context.js
import { createContext } from 'react'
const Context = createContext(null) //we overwrite this immediately, could be anything basically

//App.jsx and i'll create all the child components here as well
import Context from './Context'
import { useReducer } from 'react'

function reducer(state, action) {
  switch(action.type) {
    case 'SET_DARK_THEME': {
      return {
        ...state,
        theme: 'dark'
      }
    }
    case 'SET_LIGHT_THEME': {
      return {
        ...state,
        theme: 'light'
      }
    }
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, {
    theme: 'dark'
  })

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch }}> /* injected value will be available to all children down the line*/
        <RemoteComponent />
      </Context.Provider>
    </div>
  )
}

function RemoteComponent() {
  const { state, dispatch } = useContext(Context)
  const background = state.theme === 'dark' ? 'black' : 'yellow'
  const color = state.theme === 'dark' ? 'white' : 'black'

  return (
    <div>
        <h1 style={{ background, color }}>I am remote</h1>
        <EvenMoreRemoteComponent />
    </div>
  )
}

import { useContext } from 'react'

function EvenMoreRemoteComponent() {
  const { state, dispatch } = useContext(Context)
  return (
    <div>
        <h1 onClick={() => {
          if(state.theme === 'dark') {
            dispatch({ type: 'SET_LIGHT_THEME' })
          } else {
            dispatch({ type: 'SET_DARK_THEME' })
          }
        }}>Mode: {state.theme}</h1>
    </div>
  )
}

//CHANGE IN CONTEXT WILL RE RENDER EVERY COMPONENT UNLIKE IN REDUX


//3. Simple custom hook
import { useState } from 'react'

function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue)
  const add = () => setCount(c => c + 1)
  const sub = () => setCount(c => c - 1)

  return { count, add, sub }
}

function App() {
  const { count, add, sub } = useCounter(100)

  return (
    <div className="App">
      <h1 onClick={add}>Counter 1 @ {count}</h1>
      <h1 onClick={sub}>Counter 1 @ {count}</h1>
    </div>
  )
}


//3. Custom useLocalStorage hook

//hooks.js
import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const localStorageValue = localStorage.getItem(key)
    if (localStorageValue) {
      return localStorageValue
    }
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, state.toString())
  }, [key, state])

  return [state, setState]
}

//App.jsx
import { useLocalStorage } from './hooks'

function App() {
  const [name, setName] = useLocalStorage('user-name', 'zita')
  const [email, setEmail] = useLocalStorage('email', '123@gmail.com')

  return (
    <div className="App">
      <h1>Name: {name}</h1>
      <input type="text" value={name} onChange={(e) => {
        setName(e.target.value)
      }} />

      <h1>Email: {email}</h1>
      <input type="text" value={email} onChange={(e) => {
        setEmail(e.target.value)
      }} />
    </div>
  )
}