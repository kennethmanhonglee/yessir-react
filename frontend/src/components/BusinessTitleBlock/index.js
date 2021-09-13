import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import styles from './BusinessTitleBlock.module.css'

const BusinessTitleBlock = () => {
    const businesses = useSelector((state) => state.businesses);
    const { businessId: currentBusinessId } = useParams();
    
    // const currentBusiness = businesses[currentBusinessId];
    useEffect(() => {
        console.log(currentBusinessId);
    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <h2>food title</h2>
                <span>* * * * *</span>

            </div>
        </div>
    );
};

export default BusinessTitleBlock;