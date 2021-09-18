import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { deleteReview_thunk } from "../../store/reviews";
import styles from "./Review.module.css";

const Review = ({ review }) => {
  const currentUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const updatedAt = new Date(review.updatedAt);

  const deleteReview = async () => {
    return await dispatch(deleteReview_thunk(review));
  };

  return (
    <div className={styles.review}>
      {users[review.userId] && (
        <>
          <h2 className={styles.username}>{users[review.userId].username}</h2>
          <h4 className={styles.rating}>{review.rating} stars</h4>{" "}
          {/*change to stars graphics*/}
          <p className={styles.date}>{updatedAt.toDateString()}</p>
          <p className={styles.content}>{review.content}</p>
        </>
      )}
      {currentUser && currentUser.id === review.userId && (
        <>
          <Link
            className={styles.editReviewButton}
            to={`/reviews/${review.id}/edit`}
          >
            Edit Review
          </Link>
          <button onClick={deleteReview} className={styles.deleteReviewButton}>
            Delete Review
          </button>
        </>
      )}
    </div>
  );
};

export default Review;
