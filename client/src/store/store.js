import { applyMiddleware, compose, createStore } from 'redux';
import mapValues from 'lodash.mapvalues';
import thunk from 'redux-thunk';

import reducers from 'store/reducers';

/* eslint-disable-next-line no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => (
    createStore(
        reducers,
        mapValues(reducers, () => undefined),
        composeEnhancers(
            applyMiddleware(thunk),
        ),
    )
);
