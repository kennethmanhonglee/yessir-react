import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import styles from './Navigation.module.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div className={styles.loginSignup}>
                <LoginFormModal />
                <NavLink className={styles.signup} to="/signup">Sign Up</NavLink>
            </div>
        );
    }

    return (
        <nav>
            <li className={styles.review}>
                <NavLink exact to="/review-page">Write a Review</NavLink>
            </li>
            <li>
                <NavLink to='/businesses/create'>Create a Business</NavLink>
            </li>
            {isLoaded && <li>{sessionLinks}</li>
            }
        </nav>
    );
}

export default Navigation;