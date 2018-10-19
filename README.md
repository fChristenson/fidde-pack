# fc-pack

## Description

Create a common reducer that handles common actions.

```
const reducer = (props, fn) => (state = props.initState || {}, action) => {
  let preState = state;

  for (const prop of props.cases) {
    if (action.type === prop.type) {
      preState = prop.callback(state, action);
      break;
    }
  }

  return fn(preState, action);
};

module.exports = reducer;

```

## Example

```
  const commonReducer = require("../");
  const { combineReducers, createStore } = require("redux");

  const SET_FOO = "MY_NAMESPACE/SET_FOO";
  const LOADING_START = "MY_NAMESPACE/LOADING_START";
  const LOADING_FAILED = "MY_NAMESPACE/LOADING_FAILED";
  const LOADING_SUCCEEDED = "MY_NAMESPACE/LOADING_SUCCEEDED";

  const props = {
    initState: { ... },
    cases: [
      {
        type: LOADING_START,
        callback: state => Object.assign({}, state, { loadingState: "start" })
      },
      {
        type: LOADING_FAILED,
        callback: state => Object.assign({}, state, { loadingState: "failed" })
      },
      {
        type: LOADING_SUCCEEDED,
        callback: state =>
          Object.assign({}, state, { loadingState: "succeeded" })
      }
    ]
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_FOO:
        return Object.assign({}, state, { foo: action.value });

      default:
        return state;
    }
  };

  const myStateReducer = commonReducer(props, reducer);

  const reducers = combineReducers({
    myState: myStateReducer
  });

  const store = createStore(reducers);
```