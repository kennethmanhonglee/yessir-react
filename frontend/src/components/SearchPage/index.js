import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import styles from "./SearchPage.module.css";
import { searchBusinesses_thunk } from "../../store/search";
import { Link } from "react-router-dom";

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
        {businessList?.map((business) => (
          <div className={styles.business} key={business.id}>
            <Link to={`/businesses/${business.id}`}>
              <h2>{business.title}</h2>
              <p>{business.description}</p>
              <p>{`${business.address}, ${business.city}, ${business.state} ${business.zipCode}`}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }
};

export default SearchPage;
