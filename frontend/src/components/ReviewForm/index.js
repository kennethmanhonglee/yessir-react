import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import styles from './ReviewForm.module.css';

const placeholder = 'WOW! This place is so cool, I love their food here...'

const ReviewForm = () => {
    const { businessId } = useParams();
    const businesses = useSelector((state) => state.businesses);
    const currentBusiness = businesses[businessId];
    const [comment, setComments] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let newErrors = [];
        if (!comment) errors.push('Comment cannot be empty.');

        setErrors(newErrors);

    }, [comment]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (errors.length === 0) {
            // post review
            console.log(comment);
            setComments('');
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
                <textarea
                    placeholder={placeholder}
                    onChange={(e) => setComments(e.target.value)}
                    value={comment}
                ></textarea>
                <button type='submit' disabled={errors.length > 0} >Post Review</button>
            </form>
        </div>
    )
};

export default ReviewForm;