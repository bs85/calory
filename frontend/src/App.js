import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import SignUp from 'containers/sign-up/sign-up';

class App extends Component {
    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <React.Fragment>
                        <Route path="/sign-up" component={SignUp} />
                    </React.Fragment>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
