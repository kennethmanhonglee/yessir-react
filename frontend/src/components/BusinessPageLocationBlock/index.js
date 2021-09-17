import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styles from "./BusinessPageLocationBlock.module.css";

const BusinessPageLocationBlock = () => {
  const businesses = useSelector((state) => state.businesses);
  const { businessId: currentBusinessId } = useParams();
  const currentBusiness = businesses[currentBusinessId];
  return (
    <div className={styles.locationBlock}>
      <h2 className={styles.header}>Location</h2>
      {currentBusiness && (
        <>
          <p
            className={styles.address}
          >{`${currentBusiness.address}, ${currentBusiness.city}`}</p>
          <p
            className={styles.address}
          >{`${currentBusiness.state} ${currentBusiness.zipCode}`}</p>
        </>
      )}
    </div>
  );
};

export default BusinessPageLocationBlock;
