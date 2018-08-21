import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = (theme) => ({
    paper: {
        position: 'absolute',
        minWidth: '300px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 3,
    },
});

class SimpleModal extends React.Component {
    render() {
        const {
            classes,
            open,
            children,
            onClose,
        } = this.props;

        return (
            <Modal
                open={open}
                onClose={onClose}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    { children }
                </div>
            </Modal>
        );
    }
}

export default withStyles(styles)(SimpleModal);
