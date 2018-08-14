import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from 'containers/dashboard/dashboard';
import History from 'containers/history/history';
import SignIn from 'containers/sign-in/sign-in';
import SignUp from 'containers/sign-up/sign-up';
import RequireLogin from 'containers/require-login';

import './app.css';

const requireLogin = (WrappedComponent) => () => (
    <RequireLogin>
        <WrappedComponent />
    </RequireLogin>
);

class App extends Component {
    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <React.Fragment>
                        <Route exact path="/" render={requireLogin(Dashboard)} />
                        <Route path="/history" render={requireLogin(History)} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route path="/sign-up" component={SignUp} />
                    </React.Fragment>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
