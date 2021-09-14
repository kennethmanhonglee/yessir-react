import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";

import LoginFormModal from "../LoginFormModal";
import styles from './SignupForm.module.css'

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup_thunk({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className={styles.formDiv}>
            <h2 className={styles.header}>Sign up for Yessir!</h2>
            <form
                onSubmit={handleSubmit}
            >
                {
                    errors.length === 0 ?
                        null
                        : <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                }
                <input
                    placeholder='Email'
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    placeholder='Username'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    placeholder='Password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    placeholder='Confirm Password'
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button className={styles.submitButton} type="submit">Sign Up</button>
                <div className={styles.login}>
                    Already a member?
                    <Link>Log in</Link>
                </div>
            </form >

            <div>
            </div>
        </div >
    );
}

export default SignupFormPage;