import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
import { Redirect, useParams } from 'react-router';

import styles from './BusinessTitleBlock.module.css'

const BusinessTitleBlock = () => {
    const businesses = useSelector((state) => state.businesses);
    console.log(businesses);
    const { businessId: currentBusinessId } = useParams();
    const currentBusiness = businesses[currentBusinessId];
    console.log(currentBusiness);

    // first load - no state yet, businesses undefined
    // re-render - has state, can show information

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                {
                    currentBusiness && <h1 className={styles.title}>{currentBusiness.title}</h1>
                }
            </div>
        </div >
    );
};

export default BusinessTitleBlock;