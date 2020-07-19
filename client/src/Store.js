import React from "react";
export const Store = React.createContext();
export function StoreProvider(props) {
  const initialState = {
    user: {},
  };
  function reducer(state, action) {
    switch (action.type) {
      case "SET_CURRENT_USER":
        return {
          ...state,
          user: action.userData,
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
