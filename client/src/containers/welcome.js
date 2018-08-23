import Typography from '@material-ui/core/Typography';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUserAccount } from 'store/user/selector';
import Layout from 'components/layout/main';

class Welcome extends Component {
    render() {
        const { userAccount } = this.props;

        return (
            <Layout
                title="Welcome"
                userAccount={userAccount}
            >
                <Typography variant="headline">
                    Welcome to Calory
                </Typography>
                <Typography variant="body2">
                    <p>Use the left menu to navigate.</p>
                    <p>
                        Click <Link to="/dashboard">here</Link> to visit your dashboard
                    </p>
                </Typography>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    userAccount: getUserAccount(state),
});

export default connect(mapStateToProps)(Welcome);
