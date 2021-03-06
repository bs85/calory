import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withHttpClient } from 'components/http-client-provider';
import { getUserAccount } from 'store/user/selector';
import Layout from 'components/layout/main';
import Loading from 'components/loading';
import UserAccount from 'modules/user-account';
import EditMeal from 'components/edit-meal';
import DeleteMeal from 'components/delete-meal';
import Modal from 'components/modal';
import MealAggregate from 'components/meal-aggregate';
import DateInput, { TYPE_DATE, TYPE_TIME } from 'components/date-input';
import { getMinutesFromTime } from 'lib/date-utils';

import {
    METHOD_USER_ACCOUNT_GET_MEALS_BY_DATERANGE_AND_TIMERANGE,
} from 'routes';

import {
    aggregateByDate,
    CUTOFF_BREAKFAST,
    CUTOFF_LUNCH,
    CUTOFF_DINNER,
} from 'modules/meal';

const ACTION_EDIT_MEAL = 'EDIT_MEAL';
const ACTION_DELETE_MEAL = 'DELETE_MEAL';

const DATE_FROM = 'dateFrom';
const DATE_TO = 'dateTo';
const TIME_FROM = 'timeFrom';
const TIME_TO = 'timeTo';

const styles = () => ({
    presetButton: {
        marginRight: '10px',
        marginTop: '20px',
    },
});

class History extends Component {
    state = {
        [DATE_FROM]: moment().subtract(1, 'month'),
        [DATE_TO]: moment(),
        [TIME_FROM]: null,
        [TIME_TO]: null,
        meals: null,
        action: null,
        actionPayload: {},
    }

    componentDidMount() {
        this.fetchMeals();
    }

    componentDidUpdate(prevProps, prevState) {
        [
            DATE_FROM,
            DATE_TO,
            TIME_FROM,
            TIME_TO,
        ].forEach((attribute) => {
            // eslint-disable-next-line react/destructuring-assignment
            if (prevState[attribute] !== this.state[attribute]) {
                this.fetchMeals();
            }
        });
    }

    setAction = (action, actionPayload = {}) => this.setState({ action, actionPayload })

    fetchMeals = async () => {
        const { httpClient, userAccount } = this.props;

        const {
            dateFrom,
            dateTo,
            timeFrom,
            timeTo,
        } = this.state;

        try {
            const meals = await httpClient.dispatch(
                METHOD_USER_ACCOUNT_GET_MEALS_BY_DATERANGE_AND_TIMERANGE,
                UserAccount.getId(userAccount),
                dateFrom,
                dateTo,
                timeFrom,
                timeTo,
            );

            this.setState({ meals });
        } catch (error) {
            throw error;
        }
    }

    handleChangeDate = (which, date) => {
        this.setState({ [which]: date });
    }

    handleEditMeal = (meal) => this.setAction(ACTION_EDIT_MEAL, { meal })

    handleConfirmDeleteMeal = (meal) => this.setAction(ACTION_DELETE_MEAL, { meal })

    handleMealUpdated = () => {
        this.setAction(null);
        this.fetchMeals();
    }

    handlePreset = (lowerBound, upperBound) => {
        this.setState({
            TIME_FROM: lowerBound ? getMinutesFromTime(lowerBound) : null,
            timeTo: upperBound ? getMinutesFromTime(upperBound) : null,
        });
    }

    render() {
        const { userAccount, classes } = this.props;
        const {
            meals,
            dateFrom,
            dateTo,
            timeFrom,
            timeTo,
            action,
            actionPayload,
        } = this.state;

        let content;
        if (!userAccount || !meals) {
            content = <Loading />;
        } else {
            content = (
                <React.Fragment>
                    <Modal open={action === ACTION_EDIT_MEAL} onClose={() => this.setAction(null)}>
                        <EditMeal
                            done={this.handleMealUpdated}
                            meal={actionPayload.meal}
                            onClose={() => this.setAction(null)}
                        />
                    </Modal>
                    <Modal open={action === ACTION_DELETE_MEAL} onClose={() => this.setAction(null)}>
                        <DeleteMeal
                            done={this.handleMealUpdated}
                            meal={actionPayload.meal}
                            onClose={() => this.setAction(null)}
                        />
                    </Modal>
                    <form>
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={3} lg={2}>
                                <FormControl fullWidth>
                                    <Typography>Date From</Typography>
                                    <DateInput
                                        value={dateFrom}
                                        onChange={(date) => this.handleChangeDate(DATE_FROM, date)}
                                        type={TYPE_DATE}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3} lg={2}>
                                <FormControl fullWidth>
                                    <Typography>Date To</Typography>
                                    <DateInput
                                        value={dateTo}
                                        onChange={(date) => this.handleChangeDate(DATE_TO, date)}
                                        type={TYPE_DATE}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3} lg={2}>
                                <FormControl fullWidth>
                                    <Typography>Time From</Typography>
                                    <DateInput
                                        value={timeFrom}
                                        onChange={(date) => this.handleChangeDate(TIME_FROM, date)}
                                        type={TYPE_TIME}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3} lg={2}>
                                <FormControl fullWidth>
                                    <Typography>Time To</Typography>
                                    <DateInput
                                        value={timeTo}
                                        onChange={(date) => this.handleChangeDate(TIME_TO, date)}
                                        type={TYPE_TIME}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.handlePreset(CUTOFF_BREAKFAST, CUTOFF_LUNCH)}
                                className={classes.presetButton}
                            >
                                Breakfast
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.handlePreset(CUTOFF_LUNCH, CUTOFF_DINNER)}
                                className={classes.presetButton}
                            >
                                Lunch
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.handlePreset(CUTOFF_DINNER, CUTOFF_BREAKFAST)}
                                className={classes.presetButton}
                            >
                                Dinner
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.handlePreset(null, null)}
                                className={classes.presetButton}
                            >
                                Clear
                            </Button>
                        </div>
                    </form>
                    <MealAggregate
                        meals={aggregateByDate(meals)}
                        showDate
                    />
                </React.Fragment>
            );
        }

        return (
            <Layout
                title="Dashboard"
                userAccount={userAccount}
                onMealAdded={this.fetchMeals}
            >
                { content }
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    userAccount: getUserAccount(state),
});

export default withHttpClient(connect(mapStateToProps)(withStyles(styles)(History)));
