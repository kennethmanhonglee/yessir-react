import { useSelector } from "react-redux";
import { useParams } from "react-router";

import styles from './ReviewForm.module.css';

const ReviewForm = () => {
    const { businessId } = useParams();
    const businesses = useSelector((state) => state.businesses);
    const currentBusiness = businesses[businessId];

    return (
        <div className={styles.formDiv}>
            <form className={styles.reviewForm}>
                {
                    currentBusiness &&
                    <h2>{currentBusiness.title}</h2>
                }
            </form>
        </div>
    )
};

export default ReviewForm;