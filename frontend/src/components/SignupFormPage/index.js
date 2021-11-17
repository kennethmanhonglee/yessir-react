import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import * as sessionActions from "../../store/session";
import styles from "./SignupForm.module.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const result = await dispatch(
        sessionActions.signup_thunk({ email, username, password })
      );
      if (result.errorsMsg) setErrors(result.errorsMsg);
      return;
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field.",
    ]);
  };

  const demoUser = () => {
    setErrors([]);
    return dispatch(
      sessionActions.login_thunk({
        credential: "Demo-lition",
        password: "password",
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className={styles.formDiv}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.header}>Create your account.</h1>
        {errors.length === 0 ? null : (
          <ul className={styles.errors}>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button className={styles.submitButton} type="submit">
          Sign Up
        </button>
        <div className={styles.loginDiv}>
          <h4>Already a member?</h4>
          <NavLink to="/login" className={styles.loginLink}>
            Log in
          </NavLink>
        </div>
        <button className={styles.demo} onClick={demoUser}>
          Demo User
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
