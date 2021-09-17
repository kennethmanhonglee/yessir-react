import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import styles from './SearchPage.module.css';
import { searchBusinesses_thunk } from "../../store/search";

const SearchPage = () => {
    const { searchParamsString } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const searchState = useSelector((state) => state.search);
    const paramsArray = searchParamsString.split('='); //[searchParamsString, address]
    const businessList = paramsArray[0] === '' ? searchState[paramsArray[1]]
        : searchState[paramsArray[0]]

    useEffect(() => {
        const params = {
            searchParamsString: paramsArray[0],
            address: paramsArray[1]
        }
        console.log('i am use effect')
        dispatch(searchBusinesses_thunk(params));
    }, []);

    if (!searchState) {
        return (
            <h1>Loading...</h1>
        )
    } else {

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
}

export default SearchPage;