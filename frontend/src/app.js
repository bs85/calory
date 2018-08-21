import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import { Provider as HttpClientProvider } from 'components/http-client-provider';
import Dashboard from 'containers/dashboard/dashboard';
import History from 'containers/history/history';
import SignIn from 'containers/sign-in/sign-in';
import SignUp from 'containers/sign-up/sign-up';
import Welcome from 'containers/welcome/welcome';
import Profile from 'containers/profile/profile';
import RequireLogin from 'containers/require-login';

import './app.css';

const requireLogin = (WrappedComponent) => () => (
    <RequireLogin>
        <WrappedComponent />
    </RequireLogin>
);

class App extends Component {
    render() {
        const { history, store, httpClient } = this.props;

        return (
            <HttpClientProvider value={httpClient}>
                <Provider store={store}>
                    <Router history={history}>
                        <React.Fragment>
                            <Route exact path="/" render={requireLogin(Dashboard)} />
                            <Route path="/dashboard" render={requireLogin(Dashboard)} />
                            <Route path="/history" render={requireLogin(History)} />
                            <Route path="/welcome" render={requireLogin(Welcome)} />
                            <Route path="/profile" render={requireLogin(Profile)} />
                            <Route path="/sign-in" component={SignIn} />
                            <Route path="/sign-up" component={SignUp} />
                        </React.Fragment>
                    </Router>
                </Provider>
            </HttpClientProvider>
        );
    }
}

export default App;
