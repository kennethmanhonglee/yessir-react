import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styles from './SearchPage.module.css';

const SearchPage = () => {
    const history = useHistory();
    const searchState = useSelector((state) => state.search);
    const businessList = Object.values(searchState)[Object.values(searchState).length - 1];

    if (Object.values(searchState).length === 0) history.push('/');

    return (
        <div className={styles.businessList}>
            {businessList?.map((business) => (
                <div key={business.id} className={styles.business}>
                    <h2>{business.title}</h2>
                    <p>{business.description}</p>
                    <p>{`${business.address}, ${business.city}, ${business.state} ${business.zipCode}`}</p>
                </div>
            ))}
        </div>
    )
}

export default SearchPage;