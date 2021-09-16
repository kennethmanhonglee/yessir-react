import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from './Review.module.css';

const Review = ({ review }) => {
    const currentUser = useSelector((state) => state.session.user);
    const updatedAt = new Date(review.updatedAt);
    return (
        <div className={styles.review}>
            {
                currentUser && (
                    <>
                        <h2>{currentUser.username}</h2>
                        <h4>{review.rating}</h4>
                        <p>{updatedAt.toDateString()}</p>
                        <p>{review.content}</p>
                    </>
                )
            }
            {
                currentUser && currentUser.id === review.userId &&
                (
                    <>
                        <Link to={`/reviews/${review.id}/edit`}>Edit Review</Link>
                    </>
                )
            }
        </div>
    )
}

export default Review;