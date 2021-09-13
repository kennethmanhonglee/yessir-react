const LOAD = 'businesses/loadBusinesses';

const loadBusinesses_actionCreator = (list) => {
    return {
        type: LOAD,
        payload: list
    }
};

export const loadBusinesses_thunk = () => async (dispatch) => {
    const response = await fetch('/api/businesses');
    const businesses = await response.json();

    dispatch(loadBusinesses_actionCreator(businesses));
    return businesses;
}

const initialState = {};

const businessesReducer = (state = initialState, action) => {
    switch (action.type) {
        case (LOAD):
            const newState = { ...state };
            action.payload.forEach((business) => {
                newState[business.id] = business;
            })
            return newState;
        default:
            return state;
    }
}

export default businessesReducer;