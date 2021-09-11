import { Link } from "react-router-dom";
import styles from './Home.module.css';
import { FaSearch } from 'react-icons/fa'


const Home = () => {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.linkIcon}>
                    <Link to='/'>YESSIR!</Link> { /* placeholder link, change to logo later */}
                </div>
                <div className={styles.searchBar}>
                    <FaSearch style={{ color: 'grey' }} />
                    <input type='text' placeholder='Find your next spot' />
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.about}>
                    Github
                </div>
            </div>
        </>
    );
}

export default Home;