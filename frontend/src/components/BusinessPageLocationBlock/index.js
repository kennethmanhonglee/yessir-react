import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styles from './BusinessPageLocationBlock.module.css'

const BusinessPageLocationBlock = () => {
    const businesses = useSelector((state) => state.businesses);
    const { businessId: currentBusinessId } = useParams();
    const currentBusiness = businesses[currentBusinessId];
    return (
        <div className={styles.locationBlock}>
            <h2 className={styles.header}>Location</h2>
            {
                currentBusiness &&
                <div>{`${currentBusiness.address}, ${currentBusiness.city}, ${currentBusiness.state} ${currentBusiness.zipCode}`}</div>
            }
        </div>
    );
}

export default BusinessPageLocationBlock;