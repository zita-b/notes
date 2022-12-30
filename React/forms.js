//1. Controlled text field + 2. defaultvalue

import React from "react";

export const App: React.FC = () => {
  const [heading, setHeading] = useState('World');

  return (
    <div className ="App">
      <h1>Hello, {heading}</h1>

      <input 
        type="text"
        //defaultValue={heading} UNCONTROLLED INPUT? LMAO we can set a default value if we don't set a value? idk
        value={heading}//this is how we control a text field
        onChange={(event) => {
          const trimmed = event.target.value.trim();//before updating the state we can do anything we want with the data
          setHeading(trimmed);
        }}//for ALL INPUTS IN REACT WE HAVE THE ONCHANGE EVENT
      />
    </div>//if we set value to the input element, react will re render the oage after any change
  );
};


//3. Sign in form markup + 4. Form onSubmit and field onChange

export const App: React.FC = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="App">
      <h1>Mate academy</h1>

      <form onSubmit={(event) => {
        event.preventDefault();//now the page WILL NOT RELOAD UPON SUBMITTING
      }}>{/* if we dont specify the ACTION of the form by default it will be a GET REQUEST
      and also because of that you can see the URL SEARCH PARAMS so in the url username and password will show up which is probably
      not something that should be happening with the password at least lol */}
        <input 
          type="text" 
          name="username" 
          placeholder="Username"
          value={username}//now the input is CONTROLLED, and we need to applu ONCHANGE to be able to type in a value
          onChange={(element) => {
            setUserName(element.target.value)
          }}
        />

        <input 
          type="password" 
          name="password" 
          placeholder="Password"
          value={password}
          onChange={(element) => {
            setPassword(element.target.value)
          }}
        />{/* if we set type=password instead of text, we wont see the characters upon typing, use this for sensitive information */}

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};//so with all this we SAVE TO DATA TO OUR STATE (the inout value) so then we can
//send it to the server or perform other actions with it


//5. Textarea

export const App: React.FC = () => {
  const [comment, setComment] = useState('')

  return (
    <div className="App">
      <h1>Mate academy</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >

        <textarea 
          name="comment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        /> {/* in react TEXTAREA is SELF CLOSING!! (in plain HTML it is not) */}
      </form>
    </div>
  );
};


//6. Checkbox

export const App: React.FC = () => {
const [remember, setRemember] = useState(false)//checkbox is not checked on loading the page,
//checkbox has a BOOLEAN value so it can either be checked or not and thats it, it cant be any other value
  return (
    <div className="App">
      <h1>Mate academy</h1>

      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();

          console.log(remember)//i guess this is how we can work with the value of the check property, onSubmit
        }}
      >

      <div>
        <input
          type="checkbox"
          name="remember"
          id="remember"//ID LINKS TO LABEL SO TEXT NEXT TO THE CHECKBOX WILL BE REMEMBER ME BECAUSE OF LABEL TAG
          //ALSO YOU CAN CLICK ANYWHERE ON LABEL AND CHECK THE CHECKBOX INSTEAD OF HAVING TO CLICK INSIDE THE TINY CHECKBOX
          checked={remember}//checked= true or false
          onChange={() => {
            setRemember((state) => !state);//set the opposite every time we select / unselect checkbox
            //also we are using the PREVIOUS STATE here to set the opposite value each time
          }}
        />

        <label htmlFor="remember">
          Remember me
        </label>
      </div>

      </form>
    </div>
  );
};


//7. Select

const [color, setColor] = useState("")//use VALUE OF THE OPTION HERE if you wanna set for example "green"

<select
  name="color"
  value={color}//SET SELECTED VALUE HERE
  //AGAIN, WHEN WE MAKE ANY INPUT CONTROLLED, WE NEED TO ADD ONCHANGE OTHERWISE WE WONT BE ABLE TO INTERACT WITH THE INOUT ON THE PAGE
  //BECAUSE IT WILL ALWAYS BE THE INITIAL VALUE, SO:
  onChange={(event) => {
    setColor(event.target.value)
  }}
>
  <option value="" disabled>Choose a color</option>
  {/* if we set DISABLED, it wont be a selectable field anymore, so we can use it as an instructional default value
  that will only be available on the initial load */}
  <option value="red">Red</option>
  {/* by default first element of the select is selected */}
  <option value="green">Green</option>

  <option value="blue">Blue</option>
</select>

//SO TO MAKE AN INPUT CONTROLLED IN REACT, WE ADD VALUE AND ONCHANGE, AND THEN WE CAN WORK WITH THE VALUE INSIDE ONSUBMIT!!


//8 Radiobutton

const [sex, setSex] = useState('');

return (
  //...

  <form
    className="form"
    onSubmit={(event) => {
      event.preventDefault();

      console.log(sex)
    }}
  >

  <div>
    <label htmlFor="sex_m">Male</label>
    <input 
      type="radio"
      name="sex"
      id="sex_m"
      value="m"
      checked={sex === 'm'}//if we specifiy ATTRIBUTE CHECKED, THIS WILL BE SELECTED BY DEFAULT
      onChange={(event) => {
        setSex(event.target.value);
      }}
    />

    <label htmlFor="sex_f">Female</label>
    <input 
      type="radio"
      name="sex"
      id="sex_f"
      value="f"
      checked={sex === 'f'} //if BOTH OF THEM ARE CHECKED, THE LAST ONE WILL BE SELECTED BY DEFAULT
      //checked attribute value will be TRUE IF SEX EQUALS F
      onChange={(event) => {
        setSex(event.target.value);
      }}
    />
  </div>
</form>
)
