import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { addReview_thunk } from "../../store/reviews";

import styles from './ReviewForm.module.css';

const placeholder = 'WOW! This place is so cool, I love their food here...'

const ReviewForm = () => {
    const { businessId } = useParams();
    const businesses = useSelector((state) => state.businesses);
    const currentBusiness = businesses[businessId];
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(1);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let newErrors = [];
        if (!content) newErrors.push('Comment cannot be empty.');

        setErrors(newErrors);

    }, [content]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (errors.length === 0) {
            // post review - write thunk, write backend route
            const reviewObj = {
                userId: currentUser.id,
                businessId,
                rating,
                content
            }

            // call thunk to dispatch, then redirect to business page
            dispatch(addReview_thunk(reviewObj));
            return history.push(`/businesses/${businessId}`);
        }
    }

    return (
        <div className={styles.formDiv}>
            <form
                className={styles.reviewForm}
                onSubmit={handleSubmit}
            >
                {
                    currentBusiness &&
                    <h2>{currentBusiness.title}</h2>
                }
                <label htmlFor='rating'>Rating:</label>
                <select
                    id='rating'
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
                <textarea
                    placeholder={placeholder}
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                ></textarea>
                <button type='submit' disabled={errors.length > 0} >Post Review</button>
            </form>
        </div>
    )
};

export default ReviewForm;