import { applyMiddleware, compose, createStore } from 'redux';
import _ from 'lodash';

import reducers from 'store/reducers';

/* eslint-disable-next-line no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => (
    createStore(
        reducers,
        _.mapValues(reducers, () => undefined),
        composeEnhancers(
            applyMiddleware()
        )
    )
);
