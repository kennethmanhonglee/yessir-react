import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import styles from './ContentBlock.module.css';
import BusinessPageLocationBlock from '../BusinessPageLocationBlock';

const ContentBlock = () => {
    const { businessId } = useParams();
    return (
        <>
            {/* general structure, might create individual components later */}
            <div className={styles.contentBlockButtons}>
                <Link className={styles.reviewButtonLink} to={`/businesses/${businessId}/reviews/new`}>
                    <span className={styles.reviewButton}>
                        Write a Review
                    </span>
                </Link>
            </div>
            <BusinessPageLocationBlock />
            <div className={styles.reviewBlock}>Reviews</div>
        </>
    )
}

export default ContentBlock;