import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import styles from './ContentBlock.module.css';
import BusinessPageLocationBlock from '../BusinessPageLocationBlock';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBusiness_thunk } from '../../store/businesses';

const ContentBlock = () => {
    const { businessId } = useParams();
    const business = useSelector((state) => state.businesses[businessId]);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();


    // when deleteBusinessLink is clicked
    // 1. show modal to ask are you sure
    // if they confirm, make request to backend api to delete
    const deleteBusiness = () => {
        const deleteMessage = dispatch(deleteBusiness_thunk);
        alert(deleteMessage);
    }

    return (
        <>
            {/* general structure, might create individual components later */}
            <div className={styles.contentBlockButtons}>
                {
                    business && user &&
                    <Link className={styles.reviewButtonLink} to={`/businesses/${businessId}/reviews/new`}>
                        <span className={styles.reviewButton}>
                            Write a Review
                        </span>
                    </Link>
                }
                {
                    business && user && business.ownerId === user.id ?
                        <>
                            <Link className={styles.editBusinessLink} to={`/businesses/${businessId}/edit`}>
                                <span className={styles.editBusiness}>
                                    Edit Your Business
                                </span>
                            </Link>
                            <div className={styles.deleteBusinessLink}>
                                <span className={styles.deleteBusiness}>
                                    Delete Your Business
                                </span>
                            </div>
                        </>
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