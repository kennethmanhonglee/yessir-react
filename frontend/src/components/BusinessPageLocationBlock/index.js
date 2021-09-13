import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styles from './BusinessPageLocationBlock.module.css'

const BusinessPageLocationBlock = () => {
    const businesses = useSelector((state) => state.businesses);
    console.log('1', businesses)
    const { businessId: currentBusinessId } = useParams();
    const currentBusiness = businesses[currentBusinessId];
    console.log('2', currentBusiness)
    const { address, city, state, zipCode, latitude, longitude } = currentBusiness;
    console.log('3', address)
    return (
        <div className={styles.locationBlock}>
            <h2 className={styles.header}>Location</h2>
            {
                currentBusiness &&
                <div>{`${address}, ${city}, ${state} ${zipCode}`}</div>
            }
        </div>
    );
}

export default BusinessPageLocationBlock;