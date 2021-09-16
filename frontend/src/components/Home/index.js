import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'
import { useState } from "react";
import { useDispatch } from 'react-redux';

import { searchBusinesses_thunk } from '../../store/search';
import styles from './Home.module.css';


const Home = () => {
    const dispatch = useDispatch();
    const [searchParamsString, setSearchParamsString] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = {
            searchParamsString,
            address
        }

        const businessList = await dispatch(searchBusinesses_thunk(params));
        console.log(businessList);

    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.linkIcon}>
                    <Link to='/'>YESSIR!</Link> { /* placeholder link, change to logo later */}
                </div>
                <div className={styles.searchBar}>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <input
                            className={styles.searchInput}
                            type='text'
                            placeholder='Find your next spot'
                            onChange={(e) => setSearchParamsString(e.target.value)}
                            value={searchParamsString}
                        />
                        <input
                            className={styles.searchInput}
                            type='text'
                            placeholder='address, neighborhood, city, state, or zip'
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                        <button
                            className={styles.searchButton}
                            type='submit'
                        >
                            <FaSearch style={{ color: 'white' }} />
                        </button>
                    </form>
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