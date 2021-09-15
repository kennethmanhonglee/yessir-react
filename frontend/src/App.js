import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import BusinessPage from "./components/BusinessPage";
import ReviewForm from './components/ReviewForm';
import CreateBusinessPage from './components/CreateBusinessPage';

import * as sessionActions from "./store/session";
import * as businessesActions from './store/businesses';
import * as reviewsActions from './store/reviews';
import * as usersActions from './store/users';
import EditBusinessPage from "./components/EditBusinessPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser_thunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(businessesActions.loadBusinesses_thunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(reviewsActions.loadReviews_thunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(usersActions.loadUsers_thunk());
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
          <Route exact path='/businesses/:businessId/reviews/new'> {/*only for specific businesses*/}
            <ReviewForm />
          </Route>
          <Route path='/businesses/create'>
            <CreateBusinessPage />
          </Route>
          <Route path='/businesses/:businessId/edit'>
            <EditBusinessPage />
          </Route>
          <Route path='/businesses/:businessId'>
            <BusinessPage />
          </Route>
          <Route path='/'>
            The page you are looking for is not found.
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;