import { csrfFetch } from "./csrf";

const LOAD = 'businesses/loadBusinesses';
const ADD = 'businesses/addBusiness';
const EDIT = 'businesses/editBusiness';

// action creators
const loadBusinesses_actionCreator = (list) => {
    return {
        type: LOAD,
        payload: list
    }
};

const addBusiness_actionCreator = (newBusiness) => {
    return {
        type: ADD,
        payload: newBusiness
    }
}

const editBusiness_actionCreator = (editedBusiness) => {
    return {
        type: EDIT,
        payload: editedBusiness
    }
}

// thunks
export const loadBusinesses_thunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/businesses');
    const businesses = await response.json();

    dispatch(loadBusinesses_actionCreator(businesses));
    return businesses;
}

export const addBusiness_thunk = (business) => async (dispatch) => {
    const response = await csrfFetch('/api/businesses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(business)
    });
    const newBusiness = await response.json();

    console.log('I AM AN OBNOXIOUS CONSOLE LOG WEEE WOOOO WEEE WOOEOOWOWWOWOOWO', newBusiness);

    dispatch(addBusiness_actionCreator(newBusiness));
    return newBusiness;
};

export const editBusiness_thunk = (editedBusiness) => (dispatch) => {
    console.log(editedBusiness);
};

const initialState = {};

const businessesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case (LOAD):
            newState = Object.assign({}, state);
            action.payload.forEach((business) => {
                newState[business.id] = business;
            })
            return newState;
        case (ADD):
            newState = Object.assign({}, state);
            const newBusiness = action.payload;
            newState[newBusiness.id] = newBusiness;
            return newState;
        default:
            return state;
    }
}

export default businessesReducer;