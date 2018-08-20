import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import React from 'react';

const styles = (theme) => ({
    section: {
        padding: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
    },
});

function Section({ classes, children }) {
    return (
        <Paper className={classes.section}>
            { children }
        </Paper>
    );
}

export default withStyles(styles)(Section);
