import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";
import styles from "./Navigation.module.css";
import logo from "../../assets/images/logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className={styles.logged_in_buttons}>
        <NavLink className={styles.createBusiness} to="/businesses/create">
          Create a Business
        </NavLink>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className={styles.loginSignup}>
        {/* <LoginFormModal /> */}
        <NavLink className={styles.signup} to="/login">
          Login
        </NavLink>
        <NavLink className={styles.signup} to="/signup">
          Sign Up
        </NavLink>
      </div>
    );
  }
  return (
    <nav>
      {/*             
            add feature later
            sessionUser &&
            <li className={styles.reviewBusinesses}>
                <NavLink to="/review-page">Write a Review</NavLink>
                create a page to suggest businesses for user to write reviews for
            </li>
        */}
      <li className={styles.home}>
        <NavLink to="/">
          <div
            className={styles.homeDiv}
            style={{
              backgroundImage: `url(${logo})`,
            }}
          ></div>
        </NavLink>
      </li>
      <li className={styles.functionButtons}>
        {isLoaded && <div>{sessionLinks}</div>}
      </li>
    </nav>
  );
}

export default Navigation;
