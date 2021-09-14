import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import styles from './ContentBlock.module.css';
import BusinessPageLocationBlock from '../BusinessPageLocationBlock';
import { useSelector } from 'react-redux';

const ContentBlock = () => {
    const { businessId } = useParams();
    const business = useSelector((state) => state.businesses[businessId]);
    const user = useSelector((state) => state.session.user);
    console.log(business.ownerId, user.id);
    return (
        <>
            {/* general structure, might create individual components later */}
            <div className={styles.contentBlockButtons}>
                <Link className={styles.reviewButtonLink} to={`/businesses/${businessId}/reviews/new`}>
                    <span className={styles.reviewButton}>
                        Write a Review
                    </span>
                </Link>
                {
                    business.ownerId === user.id ?
                        <Link className={styles.editBusinessLink} to={`/businesses/${businessId}/edit`}>
                            <span className={styles.editBusiness}>
                                Edit Your Business
                            </span>
                        </Link>
                        : null
                }
            </div>
            <hr></hr>
            <BusinessPageLocationBlock />
            <div className={styles.reviewBlock}>Reviews</div>
        </>
    )
}

export default ContentBlock;