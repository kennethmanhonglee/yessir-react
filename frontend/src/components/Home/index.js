import styles from "./Home.module.css";
import SearchBar from "../SearchBar";
import food_pics from "../../assets/food_pics";
import logo from "../../assets/images/logo.png";

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
        <div className={styles.main_foreground}>
          <div className={styles.linkIcon}>
            <div
              className={styles.header}
              style={{
                backgroundImage: `url(${logo})`,
              }}
            ></div>
          </div>
          <SearchBar />
        </div>
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
