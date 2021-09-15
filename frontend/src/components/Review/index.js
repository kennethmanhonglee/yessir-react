import { useSelector } from "react-redux";
import styles from './Review.module.css';

const Review = ({ review }) => {
    const users = useSelector((state) => state.users);
    const currentUser = users[review.userId];
    const updatedAt = new Date(review.updatedAt);
    return (
        <div className={styles.review}>
            <h2>{currentUser.username}</h2>
            <h4>{review.rating}</h4>
            <p>{updatedAt.toDateString()}</p>
            <p>{review.content}</p>
        </div>
    )
}

export default Review;