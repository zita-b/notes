//1. React.PureComponent

type State = {
  age: number;
  friends: string[];
}

export class App extends React.Component<{}, State> {
  state = {
    age: 0,
    friends: ['Ted', 'Barney', 'Lilly']
  };

  addYear = () => {
    this.setState((state) => ({
      age: state.age + 1,
    }));
  };


  render () {
    console.log('App');

    const {
      age,
      friends,
    } = this.state;

    return (
      <div className='App'>
        <h1>Age is {age}</h1>

        <button
          type='button'
          onClick={this.addYear}
        >
          Year++
        </button>

        <FriendsList
          friends={friends}
        />
      </div>
    )
  }
}//every time we increase age, FRIENDSLIST gets re rendered as well (i guess because its inside app)
//so in order to optimize performance, we can tell react not to re render friendslist component =>

export class FriendsList extends React.PureComponent<Props, {}> {
  //....
}


//2. shouldComponentUpdate

export class FriendsList extends React.Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props, nextState: {}) {
    return nextProps.friends !== this.props.friends;
  }
}//this is the same as using PURECOMPONENT, but PURECOMPONENT is better, because it checks
//AUTOMATICALLY IF PROPS OR STATE HAVE CHANGED, and still updates if it does?


//3. React.memo

//FUNCTIONAL COMPONENTS
//CANNOT USE PURECOMPONENT?
//INSTEAD WE HAVE MEMO

type Props = {
  friends: string[];
}

export const FriendsList: React.FC<Props> = React.memo(
  ({ friends }) => {
    console.log('FriendsList');

    return (
      <ul>
        {friends.map((friend) => (
          <li key={friend}>
            {friend}
          </li>
        ))}
      </ul>
    );
  }
)
//memo creates a WRAPPER FUNCTION AROUND OUR FUNCTIONAL COMPONENT

export default React.memo(FriendsList) // we can do this too instead


//4. Do not mutate the state (forceUpdate)

//we wanna add a new name to our friends array =>

addFriend = () => {
  this.setState((state) => ({
    friends: [//we create a new array (instead of just pushing a new value into it for example) because
      ...state.friends,//we need to create a new array for React to know the array has changed and re render, same with objects
      Math.random(),//we are adding a random number as a new friend lol
    ],
  }));
};
//in conclusion DO NOT MUTATE ARRAYS AND OBJECTS BUT CREATE NEW ONES INSTEAD
//SO CHILD COMPONENT KNOWS THAT PROPS HAVE CHANGED (WHICH IS WHAT TRIGGERS THE RE RENDER AT LEAST
//WHEN WE ARE USING MEMO OR PURECOMPONENT I GUESS)


//5. How to update an object without mutation

//do not mutate object either create new object and add properties there


//6. How to avoid array mutation

const friendsList = ['Ted', 'Marshall', 'Lilly'];


type State = {
  friends: string[];
};

export class App extends React.Component<{}, State> {
  state: State = {
    friends: friendsList,
  };

  render() {
    const { friends } = this.state;

    return (
      <div className='App'>
        <h2>Friends</h2>
        <FriendsList friends={friends} />

        <h2>Reversed friends</h2>
        <FriendsList friends={[...friends].reverse()} />

        <h2>Sorted friends</h2>
        <FriendsList friends={[...friends].sort()} />
      </div>//etc with every METHOD THAT MUTATES THE ARRAY WE NEED TO CREATE A COP INSTEAD
      //OTHERWISE WE WILL MUTATE THE ORIGINAL ONE TOO SE HERE WE WOULD RENDER
      //THE MUTATED ARRAY TWICE AND NOT THE ORIGINAL FIRST THEN THE CHANGED ONE NEXT
    );
  }
}


//7. How to add an element without mutation

const friendsList = [
  { id: 1, name: 'Ted'},
  { id: 2, name: 'Marshal'}
];

type State = {
  friends: {
    id: number;
    name: string;
  }[];
};

export class App extends React.Component<{}, State> {
  state: State = {
    friends: friendsList,
  };

  addFriend = () => {
    const newFriend = {
      id: 6,
      name: 'Pikachu',
    };

  this.setState((state) => {
    const newFriends = [...state.friends];

    newFriends.splice(2, 0, newFriend);//remove 0 add newFriend at index 2
//here we are adding an element IN THE MIDDLE 
    return {
      friends: newFriends,
    };
  })
};

  render() {
    const { friends } = this.state;

    return (
      <div className='App'>
        <h2>Friends</h2>

        <button
          type='button'
          onClick={this.addFriend}
        >
          Add a friend
        </button>
      </div>
    )
  }
}


//8. How to remove an element

removeFriend = () => {
  const friendId = 4;

  this.setState((state) => ({
    friends: state.friends.filter(
      (friend) => friend.id !== friendId
    ),
  }));
};


//9. How to update an object in a list

updateFriend = () => {
  const friendId = 1;
  const newName= 'Ihor';

  this.setState((state) => {
    const newFriends = state.friends.map((friend) => {
      if (friend.id === friendId) {
        return {
          ...friend,
          name: newName,
        };
      }

      return friend;
    });

    return {
      friends: newFriends,
    };
  });
};


//10.How to filter a list

export class App extends React.Component<{}, State> {
  state: State = {
    friends: friendsList,
    ageLimit: 0,
  };

  show18Plus = () => {
    this.setState({
      ageLimit: 18,
    });
  };

  show25Plus = () => {
    this.setState({
      ageLimit: 25,
    });
  };

  showAll = () => {
    this.setState({
      ageLimit: 0,
    });
  };

  render() {
    const { ageLimit, friends } = this.state;

    const visibleFriends = friends.filter(
      (friend) => friend.age >= ageLimit,
    );

    return {
      //...
    }
  }
}


//11. How to sort a list

//use unique keys, default is index, if list changes, index is not good
//data from server usually comes with unique ids anyways so you can just use ids as keys
