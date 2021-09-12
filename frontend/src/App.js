import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import BusinessPage from "./components/BusinessPage";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";

import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser_thunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/business/:businessId'>
            <BusinessPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;