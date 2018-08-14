import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';

import Store from 'store/store';

/* eslint-disable-next-line no-shadow */
const render = (store) => ReactDOM.render(<App store={store} />, document.getElementById('root'));
const store = Store();

render(store);

store.subscribe(() => render(store));
