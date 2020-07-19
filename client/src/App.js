import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
function App() {
  return (
    <>
<Switch>
    <Route exact path="/sign-up" component={SignUp} />
    <Route exact path="/sign-in" component={SignIn} />
</Switch>
    </>
  );
}

export default App;
