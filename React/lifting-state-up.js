//In React, sharing state is accomplished by moving it up to the closest common ancestor
//of the components that need it. This is called “lifting state up”.
//so if two components share the same state (a value that changes i guess) they should recieve it in PROPS
//and the parent element should store the changed value so the changed value will always be in sync in all components
//that utilize it


//1.Why should we lift state up

import React, { useEffect, useState } from "react";

export const App: React.FC = () => {
  const [studentsCount, setStudentsCount] = useState(1700);
  const [employeesCount, setEmployeesCount] = useState(90);


  const addStudent = () => {
    setStudentsCount(state => state + 1);
  };

  const removeStudent = () => {
    setStudentsCount(state => state - 1);
  };

  const addEmployee = () => {
    setEmployeesCount(state => state + 1);
  };

  const removeEmployee = () => {
    setEmployeesCount(state => state - 1);
  };

  return (
    <div className="App">
      <h1>
        Mates count: {studentsCount + employeesCount}
      </h1>

      <QuantitySelector
        title={"Students"}
        count={studentsCount}
        onAdd={addStudent}
        onRemove={removeStudent}
      />

      <QuantitySelector
        title={"Employees"}
        count={employeesCount}
        onAdd={addEmployee}
        onRemove={removeEmployee}
      />
    </div>
  );
};

//QuantitySelector.tsx
type Props = {
  title: string;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const QuantitySelector: React.FC<Props> = ({
  title,
  count,
  onAdd,
  onRemove,

}) => (
  <div>
    {title}:&nbsp;
    <button type="button" onClick={onAdd}>+</button>&nbsp;
    <b>{count}&nbsp;</b>
    <button type="button" onClick={onRemove}>-</button>
  </div>
)

//so to summarize, we DO NOT HAVE STATE IN THE CHILD COMPONENT,
//CHILD COMPONENT RECEIVES STATE FROM PARENT COMPONENT (APP IN THIS CASE)
//ALONG WITH METHODS TO MANIPULATE THE STATE WHICH ARE ALSO DEFINED IN THE PARENT COMPONENT
//AND THIS SHOULD ALWAYS BE THE HIGHEST COMMON ANCESTOR COMPONENT THAT STORES
//STATES AND METHODS TO MANIPULATE IT SO WE CAN MAKE SURE
//THE DATA IS ALWAYS IN SYNC AMONG CHILDREN AND THE PARENT
//LIFTING STATE UP: WHENEVER YOU NEED TO SHARE STATE IN REACT STORE THE STATE IN THE PARENT COMPONENT
//AND PASS IT AS PROPS TO THE CHILDREN


//2.Move a form to a separate component + 3.How to delete an item from the list + 4.How to edit an item in the list
//+ 5.Working with a list of stateful components

export interface User {
  id: number,
  name: string,
}

const usersFromServer = [
  { id: 1, name: 'Roman'},
  { id: 2, name: 'Anna'},
  { id: 3, name: 'Max'},
];

export const App: React.FC = () => {
  const [users, setUsers] = useState(usersFromServer);
  
  const addUser = (name: string) => {
    setUsers((state) => {//state is the previous value of users
      const newUser = {
        id: state.length + 1,//state here is the previous users array so defining an id for the new user this way works
        name,
      };

      return [...state, newUser];
    })
  };

  const deleteUser = (userId: number) => {
    setUsers((state) => (
      state.filter(({ id }) => id !== userId)
    ))

    return [...state]
  }

  const renameUser = (userId: number, newUserName: string) => {
    setUsers((state) => (state.map((user) => {
      if (userId !== user.id) {
        return user;
      }

      return {
        id: userId,
        name: newUserName,
      }
    })))
  }

  return (
    <div className="App">
      <h1>
        Words List
      </h1>

      <NewUserForm
        onAdd={addUser}
      />

      <UsersList
        users={users}//to display users list, receives the already UPDATED USERS LIST AS PROPS
        onDelete={deleteUser}
        onRename={renameUser}
      />
    </div>
  )
}

//Userslist.tsx
import { User } from './App'

type Props = {
  users: User[];
  onDelete?: (id: number) => void;
  onRename?: (id: number, name: string) => void;
}

export const UsersList: React.FC<Props> = ({ users, onDelete, onRename }) => {
  <ul>
    {users.map(({ user }) => (
      <li key={user.id}>
        <User
          user={user}
          onRename={onRename}
          onDelete={() => onDelete(user.id)}
        />
      </li>
    ))}
  </ul>
};

//User.tsx
type Props = {
  user: User;
  onRename: (id: number, name: string) => void;
  onDelete: () => void;
}

export const User: React.FC<Props> = ({ user, onRename, onDelete }) => {

  const [newUserName, setNewUserName] = useState(user.name);

  useEffect(() => {
    setNewUserName(user.name);
  }, [user.name]);

  return (
    <>
      {user.name}
      <form 
        onSubmit={(event) => {
          event.preventDefault();

          if (onRename) {
            onRename(user.id, newUserName); 
          }

          setNewUserName('');
        }}
      >
        <input
          type="text"
          value={newUserName}
          onChange={(event) => {
            setNewUserName(event.target.value);
          }}
        />
        <button type="submit">Save</button>
      </form>

      <button
        type="button"
        onClick={() => {
          if (onDelete) {
            onDelete();
          }
        }}
      >
        X
      </button>
    </>
  )
}

//NewUserForm.tsx
type Props = {
  onAdd: (name: string) => void,
}

export const NewUserForm: React.FC<Props> = ({ onAdd }) => {
  const [newUserName, setNewUserName] = useState('');

  return (
    <form 
      onSubmit={(event) => {
        event.preventDefault();//so it doesnt reload upon submitting the form

        if (!newUserName) {
          return;
        }

        onAdd(newUserName);//we add the new user we typed into input to the users list
        setNewUserName('');
      }}
    >
      <input
        value={newUserName}
        onChange={(event) => {
          setNewUserName(event.target.value);
        }}
        type="text"
        placeholder="Enter a name"
      />
      <button type="submit">Add</button>
    </form>
  )
}
  