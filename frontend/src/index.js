import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import configureStore from './store';

const store = configureStore();

//only needed in development
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

const Root = () => {
  return (
    <Provider store={store}> {/* provider for redux store */}
      <BrowserRouter> {/* provider for browser routing */}
        <App />
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
