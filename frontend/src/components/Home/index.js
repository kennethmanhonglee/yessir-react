import { Link } from "react-router-dom";

import styles from "./Home.module.css";
import SearchBar from "../SearchBar";

const Home = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.linkIcon}>
          <Link to="/">
            <div className={styles.header}>
              <h1>Yessir!</h1>
            </div>
          </Link>
        </div>
        {/* make into one component */}
        <SearchBar />
      </div>
      <div className={styles.footer}>
        <div className={styles.github}>
          <a href="https://github.com/kennethmanhonglee">GitHub</a>
        </div>
      </div>
    </>
  );
};

export default Home;
