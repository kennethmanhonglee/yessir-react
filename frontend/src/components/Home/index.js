import { Link } from "react-router-dom";

import styles from "./Home.module.css";
import SearchBar from "../SearchBar";
import food_pics from "../../assets/food_pics";

const Home = () => {
  const random_ind = Math.floor(Math.random() * 242); //242 is length of food_pics seed array
  return (
    <>
      <div
        className={styles.main}
        style={{
          backgroundImage: `url(${food_pics[random_ind]})`,
        }}
      >
        <div className={styles.linkIcon}>
          <Link to="/">
            <div className={styles.header}>
              <h1>Yessir!</h1>
            </div>
          </Link>
        </div>
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
