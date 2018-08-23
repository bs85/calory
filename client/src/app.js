import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import { Provider as HttpClientProvider } from 'components/http-client-provider';
import RequireLogin from 'containers/require-login';

import DashboardComponent from 'containers/dashboard';
import HistoryComponent from 'containers/history';
import SignInComponent from 'containers/sign-in';
import SignUpComponent from 'containers/sign-up';
import WelcomeComponent from 'containers/welcome';
import RequestPasswordResetComponent from 'containers/request-password-reset';
import ResetPasswordComponent from 'containers/reset-password';
import ProfileComponent from 'containers/profile';

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
                            <Route path={PATH_ROOT} render={requireLogin(DashboardComponent)} exact />
                            <Route path={PATH_DASHBOARD} render={requireLogin(DashboardComponent)} />
                            <Route path={PATH_HISTORY} render={requireLogin(HistoryComponent)} />
                            <Route path={PATH_WELCOME} render={requireLogin(WelcomeComponent)} />
                            <Route path={PATH_PROFILE} render={requireLogin(ProfileComponent)} />
                            <Route path={PATH_SIGN_IN} component={SignInComponent} />
                            <Route path={PATH_SIGN_UP} component={SignUpComponent} />
                            <Route path={PATH_REQUEST_PASSWORD_RESET} component={RequestPasswordResetComponent} />
                            <Route path={PATH_RESET_PASSWORD} component={ResetPasswordComponent} />
                        </React.Fragment>
                    </Router>
                </Provider>
            </HttpClientProvider>
        );
    }
}

export default App;
