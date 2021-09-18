import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { editReview_thunk } from "../../store/reviews";
import styles from "./EditReviewPage.module.css";

const EditReviewPage = () => {
  const { reviewId } = useParams();
  const businesses = useSelector((state) => state.businesses);
  const currentUser = useSelector((state) => state.session.user);
  const currentReview = useSelector((state) => state.reviews[reviewId]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState([]);

  const placeholder = "Changed my mind about this business...";

  useEffect(() => {
    let newErrors = [];
    if (!content) newErrors.push("Comment cannot be empty.");

    setErrors(newErrors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentBusiness = businesses[currentReview?.businessId];

    if (errors.length === 0) {
      // post review - write thunk, write backend route
      const reviewObj = {
        id: reviewId,
        userId: currentUser.id,
        businessId: currentBusiness.id,
        rating,
        content,
      };

      // call thunk to dispatch, then redirect to business page
      await dispatch(editReview_thunk(reviewObj));
      return history.push(`/businesses/${currentBusiness.id}`);
    }
  };

  const reviewTitle = (
    <>
      <h1 className={styles.header}>
        {businesses[currentReview?.businessId]?.title}
      </h1>
    </>
  );

  return (
    <div className={styles.formDiv}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {reviewTitle}
        <div className={styles.selectDiv}>
          <label htmlFor="rating" className={styles.selectLabel}>
            Rating:
          </label>
          <select
            id="rating"
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            className={styles.select}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <textarea
          placeholder={placeholder}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <button
          className={styles.button}
          type="submit"
          disabled={errors.length > 0}
        >
          Post Review
        </button>
      </form>
    </div>
  );
};

export default EditReviewPage;
