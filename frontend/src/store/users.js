import { csrfFetch } from "./csrf";

const LOAD = 'users/loadUsers';

const loadUsers_actionCreator = (list) => {
    return {
        type: LOAD,
        payload: list
    }
}

export const loadUsers_thunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/users');
    const users = await response.json();

    dispatch(loadUsers_actionCreator(users));
    return;
}

const initialState = {};

const usersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case (LOAD):
            newState = Object.assign({}, state);
            action.payload.forEach((user) => {
                newState[user.id] = user;
            })
            return newState;
        default:
            return state;
    }
}

export default usersReducer;