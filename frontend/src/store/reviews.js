import { csrfFetch } from "./csrf";

//types
const LOAD = 'reviews/loadReviews';
const ADD = 'reviews/addReview';
const EDIT = 'reviews/editReview';

// action creators
const loadReviews_actionCreator = (list) => {
    return {
        type: LOAD,
        payload: list
    }
}

const addReview_actionCreator = (review) => {
    return {
        type: ADD,
        payload: review
    }
}

const editReview_actionCreator = (review) => {
    return {
        type: EDIT,
        payload: review
    }
}

// thunks
export const loadReviews_thunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews');

    const reviews = await response.json();

    dispatch(loadReviews_actionCreator(reviews));
    return;
}

export const addReview_thunk = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/businesses/${review.businessId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview_actionCreator(newReview));
        return newReview;
    }
    return;
}

export const editReview_thunk = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const editedReview = await response.json();
        dispatch(editReview_actionCreator(editedReview));

        return editedReview;
    }
    return;
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState, newReview;
    switch (action.type) {
        case (LOAD):
            newState = Object.assign({}, state);
            action.payload.forEach((review) => {
                newState[review.id] = review;
            });
            return newState;
        case (ADD):
            newState = Object.assign({}, state);
            newReview = action.payload;
            newState[newReview.id] = newReview;
            return newState;
        case (EDIT):
            newState = Object.assign({}, state);
            newReview = action.payload;
            newState[newReview.id] = newReview;
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;