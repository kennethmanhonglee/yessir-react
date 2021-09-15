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
const loadReviews_thunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews');
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState, newReview;
    switch (action.type) {
        default:
            return state;
    }
};

export default reviewsReducer;