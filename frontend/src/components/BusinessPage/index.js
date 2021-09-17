import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import styles from "./BusinessPage.module.css";
import BusinessTitleBlock from "../BusinessTitleBlock";
import ContentBlock from "../ContentBlock";

const BusinessPage = () => {
  const businesses = useSelector((state) => state.businesses);
  const { businessId } = useParams();
  const history = useHistory();

  // check if businesses has things, but businessId does not exist
  if (
    Object.keys(businesses).length > 0 &&
    businesses[businessId] === undefined
  ) {
    history.push("/");
  }

  return (
    <div className={styles.main}>
      <BusinessTitleBlock />
      <ContentBlock />
    </div>
  );
};

export default BusinessPage;
