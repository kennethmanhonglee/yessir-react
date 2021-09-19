// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser_actionCreator = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser_actionCreator = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login_thunk = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser_actionCreator(data.user));
    return response;
  } else {
    const errors = await response.json();
    return {
      error: true,
      errors,
    };
  }
};

export const restoreUser_thunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser_actionCreator(data.user));
  return response;
};

export const signup_thunk = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const result = await response.json();
  if (response.ok) {
    dispatch(setUser_actionCreator(result.user));
    return response;
  } else {
    const { errors } = result;

    const errorsMsg = errors.map((error) => error.msg);
    return {
      errorsMsg,
    };
  }
};

export const logout_thunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser_actionCreator());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
