import { Link } from "react-router-dom";

import styles from './Home.module.css';
import SearchBar from "../SearchBar";


const Home = () => {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.linkIcon}>
                    <Link to='/'>YESSIR!</Link> { /* placeholder link, change to logo later */}
                </div>
                <div className={styles.searchBar}>
                    {/* make into one component */}
                    <SearchBar />
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.github}>
                    <a href='https://github.com/kennethmanhonglee'>GitHub</a>
                </div>
            </div>
        </>
    );
}

export default Home;