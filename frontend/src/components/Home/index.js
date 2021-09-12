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
                    <input className={styles.searchInput} type='text' placeholder='Find your next spot' />
                    <input className={styles.searchInput} type='text' placeholder='address, neighborhood, city, state, or zip' />
                    <button className={styles.searchButton}><FaSearch style={{ color: 'white' }} /></button>
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