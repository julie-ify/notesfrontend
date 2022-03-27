import React, { useReducer } from "react";

const initialState = {
  url: "http://julienotesbackend.herokuapp.com",
  token: null,
  username: null
}

const reducer = ( state, action ) => {
  let newState;
  switch(action.type) {
    case "auth":
      newState = { ...state, ...action.payload };
      return newState;
    case "logout":
      newState = { ...state, token: null, username: null };
      return newState;
    default:
      return state;
  }
}

const AppContext = React.createContext(null);

export const AppState = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <AppContext.Provider value={{state, dispatch}}>
    {props.children}
  </AppContext.Provider>
}

// useAppState hook
export const useAppState = () => {
  return React.useContext(AppContext) 
}

