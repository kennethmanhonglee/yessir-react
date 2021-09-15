import { csrfFetch } from "./csrf";

//types
const LOAD = 'reviews/loadReviews';

// action creators
const loadReviews_actionCreator = (list) => {
    return {
        type: LOAD,
        payload: list
    }
}

// thunks
export const loadReviews_thunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews');

    const reviews = await response.json();

    dispatch(loadReviews_actionCreator(reviews));
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
        default:
            return state;
    }
};

export default reviewsReducer;