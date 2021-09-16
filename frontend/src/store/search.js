import { csrfFetch } from "./csrf";

const SEARCH = 'search/searchBusinesses';

const searchBusinesses_actionCreator = (params, businessList) => {
    return {
        type: SEARCH,
        payload: {
            params,
            businessList
        }
    }
};

export const searchBusinesses_thunk = (params) => async (dispatch) => {
    const response = await csrfFetch('/api/search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    const businessList = await response.json();
    await dispatch(searchBusinesses_actionCreator(params, businessList));
    return businessList;
};

const initialState = {};

const searchReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case (SEARCH):
            newState = Object.assign({}, state);
            let { params, businessList } = action.payload;
            params.searchParamsString ?
                newState[params.searchParamsString] = businessList
                : newState[params.address] = businessList
            return newState;
        default:
            return state;
    }
};

export default searchReducer;