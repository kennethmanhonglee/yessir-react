import { FaSearch } from "react-icons/fa";
import { useState } from "react";

import styles from "./SearchBar.module.css";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const history = useHistory();
  const [searchParamsString, setSearchParamsString] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    return history.push(`/search/${searchParamsString}=${address}`);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.searchBar}>
        <div className={styles.searchParams}>
          <h2>Find</h2>
        </div>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Find your next spot"
          onChange={(e) => setSearchParamsString(e.target.value)}
          value={searchParamsString}
        />
        <div className={styles.searchParams}>
          <h2>Near</h2>
        </div>
        <input
          className={`${styles.searchInput}`}
          type="text"
          placeholder="Address, neighborhood, city, state, or zip"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <button className={styles.searchButton} type="submit">
          <FaSearch style={{ color: "white" }} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
