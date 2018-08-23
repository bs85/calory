import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import React, { Component } from 'react';

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 3,
    },
});

class Notice extends Component {
    render() {
        const { classes, children, type } = this.props;

        return (
            <Paper className={`${type} ${classes.root}`}>
                { children }
            </Paper>
        );
    }
}

export default withStyles(styles)(Notice);
