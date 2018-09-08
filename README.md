# Redux and state management

# Benefits of a state tree

* A single source of truth: A single state tree also makes it easier to debug or inspect an application

* Shared caching of data in a single location without prop drilling

* Predictable state changes: A security guard to access

* Redux tooling to know when UI vs state should be updated

* Pure functions (functions that receive props but don't modify anything)

* Server side rendering (getting initial data)

Store
=====
Step 1) Create the state tree or data structure

Step 2) Provide a mechanism to get or access state. 

Step 2) Provide a mechanism to listen to changes in state. Figure out how to listen to when the state changes

Step 3) Provide a mechanism to update state. 

# Pure functions

- Pure functions always return the same result given the same arguments. 
- Pure function's execution doesn't depend on the state of the application.
- Pure functions don't modify the variables outside of their scope.
- Pure functions don't make ajax requests (which are side effects), they don't modify the DOM

If a function passes *all three* of these requirements, it’s a pure function. If it fails even *one* of these, then it’s an *impure* function.

Let's say we were dealing with a state tree like had this structure

{
  users: {},
  setting: {},
  tweets: {
    btyxlj: {
      id: 'btyxlj',
      text: 'What is a jQuery?',
      author: {
        name: 'Tyler McGinnis',
        id: 'tylermcginnis',
        avatar: 'twt.com/tm.png'
      }   
    }
  }  
}
We have three main properties on our state tree: users, settings, and tweets. Naturally, we'd create an individual reducer for both of those and then create a single root reducer using Redux's "combineReducers" method.

const reducer = combineReducers({
  users,
  settings,
  tweets
})
combineReducers, under the hood, is our first look at reducer composition. combineReducers is responsible for invoking all the other reducers, passing them the portion of their state that they care about. We're making one root reducer, by composing a bunch of other reducers together. With that in mind, let's take a closer look at our tweets reducer and how we can leverage reducer composition again to make it more compartmentalized. Specifically, let's look how a user might change their avatar with the way our store is currently structured. Here's the skeleton with what we'll start out with -

function tweets (state = {}, action) {
  switch(action.type){
      case ADD_TWEET :
        ...
      case REMOVE_TWEET :
        ...
      case UPDATE_AVATAR :
        ???
  }
}
What we're interested in is that last one, UPDATE_AVATAR. This one is interesting because we have some nested data - and remember, reducers have to be pure and can't mutate any state. Here's one approach.

function tweets (state = {}, action) {
  switch(action.type){
      case ADD_TWEET :
        ...
      case REMOVE_TWEET :
        ...
      case UPDATE_AVATAR :
        return {
          ...state,
          [action.tweetId]: {
            ...state[action.tweetId],
            author: {
              ...state[action.tweetId].author,
              avatar: action.newAvatar 
            }
          }
        }
  }
}
That's a lot of spread operators. The reason for that is because, for every layer, we're wanting to spread all the properties of that layer on the new objects we're creating (because, immutability). What if, just like we separated our tweets, users, and settings reducers by passing them the slice of the state tree they care about, what if we do the same thing for our tweets reducer and its nested data.

Doing that, the code above would be transformed to look like this

function author (state, action) {
  switch (action.type) {
      case : UPDATE_AVATAR
        return {
          ...state,
          avatar: action.newAvatar
        }
      default :
        state
  }
}
 
function tweet (state, action) {
  switch (action.type) {
      case ADD_TWEET :
        ...
      case REMOVE_TWEET :
        ...
      case : UPDATE_AVATAR
        return {
          ...state,
          author: author(state.author, action)
        }
      default :
        state
  }
}
 
function tweets (state = {}, action) {
  switch(action.type){
      case ADD_TWEET :
        ...
      case REMOVE_TWEET :
        ...
      case UPDATE_AVATAR :
        return {
          ...state,
          [action.tweetId]: tweet(state[action.tweetId], action)
        }
      default :
        state
  }
}


Example
=======

Here is an initial example of a simple state implementation:

```
// App code

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function addTodoAction(todo) {
	return {
		type: ADD_TODO,
		todo,
	}
}

function removeTodoAction(id) {
	return {
		type: REMOVE_TODO,
		id,
	}
}

function toggleTodoAction(id) {
	return {
		type: TOGGLE_TODO,
		id,
	}
}

function addGoalAction(goal) {
	return {
		type: ADD_GOAL,
		goal,
	}
}

function removeGoalAction(id) {
	return {
		type: REMOVE_GOAL,
		id,
	}
}
// This is a reducer function and its "pure"
function todos (currentState = [], action) {
	if (action.type === ADD_TODO) {
		// Cannot use .push here because it modifies state
		// and this is a pure function. Concat returns a new
		// object with the action appended to it.
		return currentState.concat([action.todo])
	} else if (action.type === REMOVE_TODO) {
		// Filter out the todo with the matching id
		return currentState.filter((todo) => todo.id !== action.id)
	} else if (action.type === TOGGLE_TODO) {
		// remember, don't directly modify state
		return currentState.map((todo) => todo.id !== action.id ? todo : {
			...todo,
			complete: !todo.complete,
			// Object.assign({}, todo, {complete: !todo.complete})
		});
	}

	// else return unmodified existing state
	return currentState;
}

function goals (currentState = [], action) {
	switch(action.type) {
		case ADD_GOAL:
			return currentState.concat([action.goal])
		case REMOVE_GOAL:
			return currentState.filter((goal) => goal.id !== action.id)
		default:
			return currentState;
	}
}

function mainReducer (state = {}, action) {
	return {
		todos: todos(state.todos, action),
		goals: goals(state.goals, action),
	}
}


// Library code
function createStore (reducer) {
	// The store has four purposes
	// 1. Maintain the state
	// 2. Get the state.
	// 3. Listen to changes on the state.
	// 4. Update the state

	// Maintain the state, purpose #1
	let state;
	let listeners = [];

	// Get the state, purpose #2
	const getState = () => state

	// Allow listeners: purpose #3
	const subscribe = (listener) => {
		listeners.push(listener);

	// Return a function to remove the listener
		return () => {
			// Remove listener
			listeners = listeners.filter((l) => l !== listener)
		}
	}

	// update the state: purpose #4
	const dispatch = (action) => {
		// call reducer function
		state = reducer(state, action);

		// call all listeners
		listeners.forEach((listener) => listener())
	}

	// This is the API to access state
	return {
		getState,
		subscribe,
		dispatch,
	}
}


// Test code
const store = createStore(mainReducer)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }
})

store.dispatch({
  type: REMOVE_TODO,
  id: 1
})

store.dispatch({
  type: TOGGLE_TODO,
  id: 0
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: 'Lose 20 pounds'
  }
})

store.dispatch({
  type: REMOVE_GOAL,
  id: 0
})

store.dispatch(addTodoAction({
	{
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }
}))
```

