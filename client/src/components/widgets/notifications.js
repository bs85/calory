import { withStyles } from '@material-ui/core/styles';

import React, { Component } from 'react';

import Notification, { TYPE_SUCCESS } from 'modules/notification';

const styles = (theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        right: theme.spacing.unit,
        left: theme.spacing.unit,
        alignItems: 'flex-end',
        zIndex: 100000,
    },
    notification: {
        cursor: 'pointer',
        minWidth: '80%',
        border: '1px solid transparent',
        padding: theme.spacing.unit * 3,
        borderRadius: '4px',
        '& + $notification': {
            marginTop: theme.spacing.unit,
        },
    },
    [`notification${TYPE_SUCCESS}`]: {
        color: '#155724',
        borderColor: '#c3e6cb',
        backgroundColor: '#d4edda',
    },
});

class Notifications extends Component {
    renderNotification = (notification) => {
        const { classes, dismiss } = this.props;

        return (
            <div
                className={`${classes.notification} ${classes[`notification${TYPE_SUCCESS}`]}`}
                onClick={() => dismiss(Notification.getId(notification))}
            >
                { Notification.getMessage(notification) }
            </div>
        );
    }

    render() {
        const { classes, notifications } = this.props;

        return (
            <div className={classes.root} id="notification">
                { notifications.map(this.renderNotification) }
            </div>
        );
    }
}

export default withStyles(styles)(Notifications);
