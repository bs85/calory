import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Form from 'lib/form';
import DateInput, { TYPE_DATE, TYPE_TIME } from 'components/date-input';
import { withHttpClient } from 'components/http-client-provider';
import UserAccount from 'modules/user-account';
import { getUserAccount } from 'store/user/selector';
import { setAccount } from 'store/user/actions';
import { success } from 'store/notification/actions';
import { getMinutesFromDateInstance, getCurrentEffectiveDate } from 'lib/date-utils';

import Meal, {
    CUTOFF_BREAKFAST,
} from 'modules/meal';

import {
    METHOD_MEAL_CREATE,
    METHOD_MEAL_UPDATE,
} from 'routes';

import {
    FIELD_DESCRIPTION,
    FIELD_EFFECTIVE_DATE,
    FIELD_TIME,
    FIELD_TOTAL_CALORIES,
    FIELDS,
    RULES,
} from 'forms/meal';

const styles = () => ({});

class AddMeal extends React.Component {
    state = {
        form: new Form(
            FIELDS,
            RULES,
            () => (
                /* eslint-disable-next-line react/destructuring-assignment */
                this.props.meal
                    /* eslint-disable-next-line react/destructuring-assignment */
                    ? this.props.meal
                    : {
                        [FIELD_EFFECTIVE_DATE]: getCurrentEffectiveDate(new Date(), CUTOFF_BREAKFAST),
                        [FIELD_TIME]: getMinutesFromDateInstance(new Date()),
                    }
            ),
            (form) => this.setState({ form }),
        ),
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

        const { form } = this.state;

        if (!form.isValid()) {
            return;
        }

        this.setState({
            saving: true,
            error: null,
        });

        try {
            await (meal
                ? httpClient.dispatch(
                    METHOD_MEAL_UPDATE,
                    UserAccount.getId(userAccount),
                    Meal.getId(meal),
                    form.getData(),
                )
                : httpClient.dispatch(
                    METHOD_MEAL_CREATE,
                    UserAccount.getId(userAccount),
                    form.getData(),
                ));

            success(meal ? 'Meal updated' : 'Meal saved!');

            if (done) done();
        } catch (error) {
            this.setState({ error: error.message });
        } finally {
            this.setState({ saving: false });
        }
    }

    render() {
        const { form, saving, error } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <form onSubmit={(event) => { event.preventDefault(); this.handleSubmit(); }}>
                    { form.renderField(
                        FIELD_DESCRIPTION,
                        true,
                        { fullWidth: true },
                        { disabled: saving, autoFocus: true },
                    )}
                    { form.renderField(
                        FIELD_TOTAL_CALORIES,
                        true,
                        { fullWidth: true },
                        { disabled: saving },
                    )}
                    { form.renderField(
                        FIELD_EFFECTIVE_DATE,
                        true,
                        { fullWidth: true },
                        { type: TYPE_DATE, disabled: saving },
                        DateInput,
                    )}
                    { form.renderField(
                        FIELD_TIME,
                        true,
                        { fullWidth: true },
                        { type: TYPE_TIME, disabled: saving },
                        DateInput,
                    )}
                    { error ? <div className={classes.error}>{ error }</div> : null }
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={saving || !form.isValid()}
                    >
                        { saving ? 'Saving...' : 'Save' }
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
        connect(mapStateToProps, mapDispatchToProps)(AddMeal),
    ),
);
