import { csrfFetch } from "./csrf";

const LOAD = 'businesses/loadBusinesses';
const ADD = 'businesses/addBusiness';
const EDIT = 'businesses/editBusiness';
const DELETE = 'businesses/deleteBusiness';

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

const deleteBusiness_actionCreator = (businessIdToDelete) => {
    return {
        type: DELETE,
        payload: businessIdToDelete
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

    dispatch(addBusiness_actionCreator(newBusiness));
    return newBusiness;
};

export const editBusiness_thunk = (editedBusiness) => async (dispatch) => {
    const { id } = editedBusiness;
    const response = await csrfFetch(`/api/businesses/${parseInt(id)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedBusiness)
    });

    const newBusiness = await response.json();
    dispatch(editBusiness_actionCreator(newBusiness));
    return newBusiness;
};

export const deleteBusiness_thunk = (businessIdToDelete) => async (dispatch) => {
    const response = await csrfFetch(`api/businesses/${parseInt(businessIdToDelete)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const deleteResponse = await response.json();
    if (deleteResponse === 'deleted') {
        await dispatch(deleteBusiness_actionCreator(businessIdToDelete));
        return 'delete successful';
    } else {
        return 'delete unsuccessful';
    }
};

const initialState = {};

const businessesReducer = (state = initialState, action) => {
    let newState, newBusiness;
    switch (action.type) {
        case (LOAD):
            newState = Object.assign({}, state);
            action.payload.forEach((business) => {
                newState[business.id] = business;
            })
            return newState;
        case (ADD):
            newState = Object.assign({}, state);
            newBusiness = action.payload;
            newState[newBusiness.id] = newBusiness;
            return newState;
        case (EDIT):
            newState = Object.assign({}, state);
            newBusiness = action.payload;
            newState[newBusiness.id] = newBusiness;
            return newState;
        case (DELETE):
            newState = Object.assign({}, state);
            const { businessIdToDelete } = action.payload;
            delete newState[businessIdToDelete];
            return newState;
        default:
            return state;
    }
}

export default businessesReducer;