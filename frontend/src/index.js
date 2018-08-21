import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import App from 'app';
import Store from 'store/store';
import { setAccount } from 'store/user/actions';
import { HttpClient, AuthenticationError } from 'lib/http-client';
import { METHOD_WHOAMI } from 'routes';

const httpClient = new HttpClient(CONFIG.API_SERVER_URL);

async function run() {
    const store = Store();

    const history = createBrowserHistory();

    try {
        const user = await httpClient.dispatch(METHOD_WHOAMI);

        if (user) {
            store.dispatch(setAccount(user));
        }
    } catch (error) {
        if (!(error instanceof AuthenticationError)) {
            throw error;
        }
    }

    /* eslint-disable-next-line no-shadow */
    const render = () => ReactDOM.render(
        <App history={history} store={store} httpClient={httpClient} />, document.getElementById('root'),
    );

    render();

    store.subscribe(() => render());
}

run();
