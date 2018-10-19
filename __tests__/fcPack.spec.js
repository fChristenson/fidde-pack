const commonReducer = require("..");
const { combineReducers, createStore } = require("redux");

describe("fcPack", () => {
  const SET_FOO = "MY_NAMESPACE/SET_FOO";
  const LOADING_START = "MY_NAMESPACE/LOADING_START";
  const LOADING_FAILED = "MY_NAMESPACE/LOADING_FAILED";
  const LOADING_SUCCEEDED = "MY_NAMESPACE/LOADING_SUCCEEDED";

  const props = {
    initState: { foo: 2 },
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

  let store;

  beforeEach(() => {
    store = createStore(reducers);
  });

  it("has a module", () => {
    const expected = "function";
    const actual = typeof commonReducer;
    expect(expected).toEqual(actual);
  });

  it("sets init state", () => {
    const expected = 2;
    const actual = store.getState().myState.foo;
    expect(expected).toEqual(actual);
  });

  it("sets foo to 1", () => {
    store.dispatch({ type: SET_FOO, value: 1 });
    const expected = 1;
    const actual = store.getState().myState.foo;
    expect(expected).toEqual(actual);
  });

  it("sets foo to 1 and loading start", () => {
    store.dispatch({ type: SET_FOO, value: 1 });
    store.dispatch({ type: LOADING_START });
    expect(store.getState().myState.foo).toEqual(1);
    expect(store.getState().myState.loadingState).toEqual("start");
  });

  it("sets foo to 1 and loading failed", () => {
    store.dispatch({ type: SET_FOO, value: 1 });
    store.dispatch({ type: LOADING_FAILED });
    expect(store.getState().myState.foo).toEqual(1);
    expect(store.getState().myState.loadingState).toEqual("failed");
  });

  it("sets foo to 1 and loading succeeded", () => {
    store.dispatch({ type: SET_FOO, value: 1 });
    store.dispatch({ type: LOADING_SUCCEEDED });
    expect(store.getState().myState.foo).toEqual(1);
    expect(store.getState().myState.loadingState).toEqual("succeeded");
  });

  it("sets foo to 1 and overwrites loading state", () => {
    store.dispatch({ type: SET_FOO, value: 1 });
    store.dispatch({ type: LOADING_START });
    store.dispatch({ type: LOADING_FAILED });
    store.dispatch({ type: LOADING_SUCCEEDED });
    expect(store.getState().myState.foo).toEqual(1);
    expect(store.getState().myState.loadingState).toEqual("succeeded");
  });
});
