import Paper from '@material-ui/core/Paper';

import React, { Component } from 'react';

class Notice extends Component {
    render() {
        const { children, type } = this.props;

        return (
            <Paper className={`${type}`}>
                { children }
            </Paper>
        );
    }
}

export default Notice;
