import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import axios from 'axios';

import App from 'app';
import Store from 'store/store';
import { setAccount } from 'store/user/actions';
import { HttpClient, AuthenticationError } from 'lib/http-client';
import { METHODS, METHOD_WHOAMI } from 'routes';
import Loading from 'components/loading';

const rootNode = document.getElementById('root');

ReactDOM.render(<Loading />, rootNode);

const httpAdapter = axios.create({
    baseURL: this.apiUrl,
    withCredentials: true,
});

const httpClient = new HttpClient(CONFIG.API_SERVER_URL, httpAdapter, METHODS);

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

    const render = () => ReactDOM.render(
        <App history={history} store={store} httpClient={httpClient} />, rootNode,
    );

    render();

    store.subscribe(() => render());
}

run();
