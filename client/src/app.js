import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import { Provider as HttpClientProvider } from 'components/http-client-provider';
import Dashboard from 'containers/dashboard/dashboard';
import History from 'containers/history/history';
import SignIn from 'containers/sign-in/sign-in';
import SignUp from 'containers/sign-up/sign-up';
import Welcome from 'containers/welcome/welcome';
import RequestPasswordReset from 'containers/request-password-reset';
import ResetPassword from 'containers/reset-password/reset-password';
import Profile from 'containers/profile/profile';
import RequireLogin from 'containers/require-login';

import {
    PATH_ROOT,
    PATH_SIGN_UP,
    PATH_WELCOME,
    PATH_SIGN_IN,
    PATH_REQUEST_PASSWORD_RESET,
    PATH_RESET_PASSWORD,
    PATH_DASHBOARD,
    PATH_PROFILE,
    PATH_HISTORY,
} from 'constants/paths';

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
                            <Route exact path={PATH_ROOT} render={requireLogin(Dashboard)} />
                            <Route path={PATH_DASHBOARD} render={requireLogin(Dashboard)} />
                            <Route path={PATH_HISTORY} render={requireLogin(History)} />
                            <Route path={PATH_WELCOME} render={requireLogin(Welcome)} />
                            <Route path={PATH_PROFILE} render={requireLogin(Profile)} />
                            <Route path={PATH_SIGN_IN} component={SignIn} />
                            <Route path={PATH_SIGN_UP} component={SignUp} />
                            <Route path={PATH_REQUEST_PASSWORD_RESET} component={RequestPasswordReset} />
                            <Route path={PATH_RESET_PASSWORD} component={ResetPassword} />
                        </React.Fragment>
                    </Router>
                </Provider>
            </HttpClientProvider>
        );
    }
}

export default App;
