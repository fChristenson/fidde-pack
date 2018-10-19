# fc-pack

## Description

Create a common reducer that handles common actions.

```
const reducer = (props, fn) => (state = {}, action) => {
  let preState;

  switch (action[props.actionLabel || "type"]) {
    case props.LOADING_START:
      preState = props.start(state, action);
      break;

    case props.LOADING_FAILED:
      preState = props.failed(state, action);
      break;

    case props.LOADING_SUCCEEDED:
      preState = props.succeeded(state, action);
      break;

    default:
      preState = state;
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
    LOADING_START,
    start: state => Object.assign({}, state, { loadingState: "start" }),
    LOADING_FAILED,
    failed: state => Object.assign({}, state, { loadingState: "failed" }),
    LOADING_SUCCEEDED,
    succeeded: state => Object.assign({}, state, { loadingState: "succeeded" })
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
```