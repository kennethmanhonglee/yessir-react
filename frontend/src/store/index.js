import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import businessesReducer from './businesses';
import reviewsReducer from './reviews';
import sessionReducer from './session';
import usersReducer from './users';
import searchReducer from './search';

const rootReducer = combineReducers({
    session: sessionReducer,
    businesses: businessesReducer,
    reviews: reviewsReducer,
    users: usersReducer,
    search: searchReducer
});

let enhancer;

//only use logger when in development
if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;