import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Review from "../Review";
import styles from "./ReviewsBlock.module.css";

const ReviewsBlock = () => {
  const { businessId } = useParams();
  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj);

  const currentReviews = reviews.filter(
    (review) => review.businessId === +businessId
  );
  return (
    <div className={styles.reviewsBlock}>
      <div className={styles.header}>
        <h2>Reviews</h2>
      </div>
      {currentReviews.length > 0
        ? currentReviews.map((review) => (
            <Review key={review.id} review={review} />
          ))
        : null}
    </div>
  );
};

export default ReviewsBlock;
