import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

import styles from "./SearchPage.module.css";
import { searchBusinesses_thunk } from "../../store/search";

const SearchPage = () => {
  const { searchParamsString } = useParams();
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search);
  const paramsArray = searchParamsString.split("="); //[searchParamsString, address]
  const businessList =
    paramsArray[0] === ""
      ? searchState[paramsArray[1]]
      : searchState[paramsArray[0]];

  useEffect(() => {
    const params = {
      searchParamsString: paramsArray[0],
      address: paramsArray[1],
    };
    dispatch(searchBusinesses_thunk(params));
  }, [dispatch]);

  if (!searchState) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className={styles.businessList}>
        <div className={styles.headerDiv}>
          <h2 className={styles.header}>All Results</h2>
        </div>
        {businessList?.map((business) => (
          <div key={business.id} className={styles.business}>
            <NavLink
              className={styles.businessLink}
              to={`/businesses/${business.id}`}
            >
              <h2 className={styles.title}>{business.title}</h2>
              <p className={styles.description}>{business.description}</p>
              <p
                className={styles.address}
              >{`${business.address}, ${business.city}, ${business.state} ${business.zipCode}`}</p>
            </NavLink>
          </div>
        ))}
      </div>
    );
  }
};

export default SearchPage;
