import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import login_pic from "../../assets/images/signup_illustration.png";
import * as sessionActions from "../../store/session";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
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
    } else {
      history.push("/");
    }
  };

  const demoUser = async () => {
    setErrors([]);
    await dispatch(
      sessionActions.login_thunk({
        credential: "Demo-lition",
        password: "password",
      })
    );
    history.push("/");
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.formDiv}>
        <h1>Log in to Yessir</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <ul className={styles.errors}>
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
        <div className={styles.button} onClick={demoUser}>
          Demo User
        </div>
      </div>
      <div
        className={styles.login_picture}
        style={{
          backgroundImage: `url(${login_pic})`,
        }}
      ></div>
    </div>
  );
}

export default LoginForm;
