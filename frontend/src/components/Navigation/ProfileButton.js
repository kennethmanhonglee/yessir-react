import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import styles from './ProfileButton.module.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout_thunk());
    };

    return (
        <div className={styles.loginLogout}>
            <button className={styles.profileButton} onClick={openMenu}>
                <i className={`fas fa-user-circle ${styles.icon}`} />
            </button>
            {showMenu && (
                <ul className="profile-dropdown" style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    padding: '5px',
                    margin: '10px'
                }}>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;