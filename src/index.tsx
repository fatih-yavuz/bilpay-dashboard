import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import configureStore from "./store";
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
