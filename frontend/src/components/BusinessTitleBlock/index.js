import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
import { useParams } from 'react-router';

import styles from './BusinessTitleBlock.module.css'

const BusinessTitleBlock = () => {
    const businesses = useSelector((state) => state.businesses);
    const { businessId: currentBusinessId } = useParams();
    const currentBusiness = businesses[currentBusinessId];

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                {
                    currentBusiness && (
                        <>
                            <h1>{currentBusiness.title}</h1>
                            <h2>Address</h2>
                            <span> {`${currentBusiness.address}, ${currentBusiness.city}, ${currentBusiness.state} ${currentBusiness.zipCode} ---- ${currentBusiness.latitude} - ${currentBusiness.longitude}`}</span>
                        </>
                    )
                }

            </div>
        </div >
    );
};

export default BusinessTitleBlock;