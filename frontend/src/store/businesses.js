const LOAD = 'businesses/loadBusinesses';

const loadBusinesses_actionCreator = () => {
    return {
        type: LOAD
    }
};

const loadBusinesses_thunk = () => (dispatch) => {

}

const initialState = {};

const businessesReducer = (state = initialState, action) => {
    switch (action.type) {
        case (LOAD):

        default:
            return state;
    }
}

export default businessesReducer;