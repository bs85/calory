import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withHttpClient } from 'components/http-client-provider';
import UserAccount from 'modules/user-account';
import Meal from 'modules/meal';
import { getUserAccount } from 'store/user/selector';
import { setAccount } from 'store/user/actions';
import { success } from 'store/notification/actions';

import {
    METHOD_MEAL_DELETE,
} from 'routes';

const styles = () => ({});

class DeleteMeal extends React.Component {
    state = {
        saving: false,
        error: null,
    }

    handleSubmit = async () => {
        const {
            httpClient,
            success,
            userAccount,
            done,
            meal,
        } = this.props;

        this.setState({
            saving: true,
            error: null,
        });

        try {
            await httpClient.dispatch(
                METHOD_MEAL_DELETE,
                UserAccount.getId(userAccount),
                Meal.getId(meal),
            );

            success('Meal deleted');

            if (done) done();
        } catch (error) {
            this.setState({ error: error.message });
        } finally {
            this.setState({ saving: false });
        }
    }

    render() {
        const { saving, error } = this.state;
        const { classes, onClose } = this.props;

        return (
            <div>
                <form onSubmit={(event) => { event.preventDefault(); this.handleSubmit(); }}>
                    <Typography>
                        Are you sure?
                    </Typography>
                    { error ? <div>{ error }</div> : null }
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={saving}
                    >
                        { saving ? 'Deleting...' : 'Delete' }
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        disabled={saving}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userAccount: getUserAccount(state),
});

const mapDispatchToProps = (dispatch) => ({
    setAccount: (account) => dispatch(setAccount(account)),
    success: (message) => dispatch(success(message)),
});

export default withHttpClient(
    withStyles(styles)(
        connect(mapStateToProps, mapDispatchToProps)(DeleteMeal),
    ),
);
