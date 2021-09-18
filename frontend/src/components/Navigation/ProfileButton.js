import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import styles from "./ProfileButton.module.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout_thunk());
    history.push("/");
  };

  return (
    <div className={styles.loginLogout}>
      <button className={styles.profileButton} onClick={openMenu}>
        <i className={`fas fa-user-circle ${styles.icon}`} />
      </button>
      {showMenu && (
        <div
          className={`profile-dropdown ${styles.dropdown}`}
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            padding: "5px",
            margin: "10px",
            position: "absolute",
            right: "5%",
            top: "10%",
          }}
        >
          <ul className={styles.ul}>
            <li>username: {user.username}</li>
            <li>email: {user.email}</li>
          </ul>
          <button className={styles.button} onClick={logout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
