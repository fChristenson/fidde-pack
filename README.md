# fidde-pack

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