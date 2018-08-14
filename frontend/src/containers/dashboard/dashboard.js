import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserAccount } from 'store/user/selector';
import Layout from 'components/layout/main';
import Loading from 'components/loading';

class App extends Component {
    render() {
        const { userAccount } = this.props;

        if (!userAccount) {
            return <Loading />;
        }

        return (
            <Layout
                title="Dashboard"
                userAccount={userAccount}
            >
                Dashboard Content
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    userAccount: getUserAccount(state),
});

export default connect(mapStateToProps)(App);
