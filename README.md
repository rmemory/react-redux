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

Example
=======

Here is an initial example of a simple state implementation:

```
// These are the list of allowable actions
/* 
We need a way to describe state changes in our application. We'll use actions for this. Actions are payloads of information that send an instruction on what type of transformation to make to your application’s state as well as any other relevant information. 

One thing to note is that actions must have a type property to specify, well, the “type” of action which is occurring. Other than ‘type’, the structure of the action is up to you.
 */
{
	type: 'ADD_TODO',
	todo: {
		id: 0,
		name: 'Learn Redux',
		complete: false,
	}
}

{
	type: 'REMOVE_TODO',
	id: 0,
}

{
	type: 'TOGGLE_TODO',
	id: 0,
}

{
	type: 'ADD_GOAL',
	goal: {
		id: 0,
		name: 'Run a Marathon'
	}
}

{
	type: 'REMOVE_GOAL',
	id: 0
}

function createStore () {
	// The store should have four parts
	// 1. The state
	// 2. Get the state.
	// 3. Listen to changes on the state.
	// 4. Update the state

	let state;
	let listeners = [];

	const getState = () => state

	const subscribe = (listener) => {
		listeners.push(listener);

	// Return a function to remove the listener
		return () => {
			listeners = listeners.filter((l) => l !== listener)
		}
	}

	// This is the API to access state
	return {
		getState,
		subscribe,
	}
}

const theState = createStore()

const copyOfState = getState
const unsubscribe_function = subscribe(() => {do stuff in my listener})
```

# Pure functions

- Pure functions always return the same result given the same arguments. 
- Pure function's execution doesn't depend on the state of the application.
- Pure functions don't modify the variables outside of their scope.

If a function passes *all three* of these requirements, it’s a pure function. If it fails even *one* of these, then it’s an *impure* function.




