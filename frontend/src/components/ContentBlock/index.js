import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ContentBlock.module.css';
import BusinessPageLocationBlock from '../BusinessPageLocationBlock';
import ReviewsBlock from '../ReviewsBlock';
import { deleteBusiness_thunk } from '../../store/businesses';

const ContentBlock = () => {
    const { businessId } = useParams();
    const business = useSelector((state) => state.businesses[businessId]);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();


    // when deleteBusinessLink is clicked
    // 1. show modal to ask are you sure
    // if they confirm, make request to backend api to delete
    const deleteBusiness = async () => {
        const deleteMessage = await dispatch(deleteBusiness_thunk(businessId));

        console.log(deleteMessage);

        return history.push('/');
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
                            <div className={styles.deleteBusinessLink} onClick={deleteBusiness}>
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
            <div className={styles.reviewBlock}>
                <ReviewsBlock />
            </div>
        </>
    )
}

export default ContentBlock;