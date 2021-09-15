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
            <li className={styles.reviewBusinesses}>
                <NavLink exact to="/review-page">Write a Review</NavLink> {/* create a page to suggest businesses for user to write reviews for */}
            </li>
            <li className={styles.home}>
                <NavLink to='/'><span>Yessir Logo</span></NavLink>
            </li>
            <li className={styles.functionButtons}>
                <NavLink className={styles.createBusiness} to='/businesses/create'>Create a Business</NavLink>
                {isLoaded && <div>{sessionLinks}</div>}
            </li>
        </nav>
    );
}

export default Navigation;