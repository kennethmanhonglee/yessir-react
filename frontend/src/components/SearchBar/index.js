import { FaSearch } from 'react-icons/fa'
import { useState } from "react";
import { useDispatch } from 'react-redux';

import { searchBusinesses_thunk } from '../../store/search';
import styles from './SearchBar.module.css'
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchParamsString, setSearchParamsString] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = {
            searchParamsString,
            address
        }

        await dispatch(searchBusinesses_thunk(params));

        return history.push('/search');
    }
    return (
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
    )
}

export default SearchBar;