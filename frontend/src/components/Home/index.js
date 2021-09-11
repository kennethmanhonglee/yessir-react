import { Link } from "react-router-dom";
import styles from './Home.module.css';


const Home = () => {
    return (
        <>
            <div className={styles.main}>
                <Link to='/'>YESSIR!</Link> { /* placeholder link, change to logo later */}
                <div className={styles.searchBar}>searchBar</div>
            </div>
            <div className='footer'>footer</div>
        </>
    );
}

export default Home;