import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getIsLoggedIn } from 'store/user/selector';

import { PATH_SIGN_IN } from 'constants/paths';

class RequireLogin extends Component {
    render() {
        const { isLoggedIn, children } = this.props;

        return isLoggedIn
            ? children
            : <Redirect to={PATH_SIGN_IN} />;
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: getIsLoggedIn(state),
});

export default connect(mapStateToProps)(RequireLogin);
