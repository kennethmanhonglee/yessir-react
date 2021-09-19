import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const result = await dispatch(
      sessionActions.login_thunk({ credential, password })
    );

    if (result.error) {
      setErrors(result.errors.err.errors);
    }

    // (
    //   async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   }
    // );
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
      <h1>Welcome back.</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          className={styles.input}
          required
          placeholder="Username or Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
          placeholder="Password"
        />
        <button className={styles.button} type="submit">
          Log In
        </button>
      </form>
      <button className={styles.button} onClick={demoUser}>
        Demo User
      </button>
    </div>
  );
}

export default LoginForm;
