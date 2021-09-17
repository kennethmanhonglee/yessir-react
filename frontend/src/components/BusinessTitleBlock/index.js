import { useSelector } from "react-redux";
// import { useEffect } from 'react';
import { useParams } from "react-router";

import styles from "./BusinessTitleBlock.module.css";

const BusinessTitleBlock = () => {
  const businesses = useSelector((state) => state.businesses);
  const { businessId: currentBusinessId } = useParams();
  const currentBusiness = businesses[currentBusinessId];

  return (
    <div className={styles.main}>
      <div className={styles.titleDiv}>
        {currentBusiness && (
          <h1 className={styles.title}>{currentBusiness.title}</h1>
        )}
      </div>
      <div className={styles.content}>
        {currentBusiness && <p>{currentBusiness.description}</p>}
      </div>
    </div>
  );
};

export default BusinessTitleBlock;
