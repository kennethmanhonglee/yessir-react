import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ReviewsBlock = () => {
    // on app.js render, store all reviews into redux store as its own slice of state
    // ^done
    // when we load one particular business page, we can go to redux store to get all reviews
    // ^done
    // and useSelector to FILTER the ones where businessId matches current business.id
    // ^DOING
    const { businessId } = useParams();

    const reviewsObj = useSelector((state) => state.reviews);
    const reviews = Object.values(reviewsObj);
    const currentReviews = reviews.filter((review) => review.businessId === +businessId);
    return (
        <>
            {
                currentReviews.length > 0 ?
                    currentReviews.map((review) => <p key={review.id}>{review.content}</p>)
                    : null
            }
        </>
    )
}

export default ReviewsBlock;