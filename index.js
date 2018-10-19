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
