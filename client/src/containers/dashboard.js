import Typography from '@material-ui/core/Typography';

import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notice from 'components/notice';
import { METHOD_USER_ACCOUNT_GET_MEALS_BY_DATE } from 'routes';
import { withHttpClient } from 'components/http-client-provider';
import { getUserAccount } from 'store/user/selector';
import Layout from 'components/layout/main';
import Loading from 'components/loading';
import UserAccount from 'modules/user-account';
import { getTotal } from 'modules/meal';
import EditMeal from 'components/edit-meal';
import DeleteMeal from 'components/delete-meal';
import Modal from 'components/modal';
import MealList from 'components/meal-list';
import DayBreakdown from 'components/day-breakdown';
import DateInput, { TYPE_DATE } from 'components/date-input';

const ACTION_EDIT_MEAL = 'EDIT_MEAL';
const ACTION_DELETE_MEAL = 'DELETE_MEAL';

class App extends Component {
    state = {
        date: new Date(),
        meals: null,
        action: null,
        actionPayload: {},
    }

    componentDidMount() {
        this.fetchTodayMeals();
    }

    componentDidUpdate(prevProps, prevState) {
        const { date } = this.state;

        if (prevState.date !== date) {
            this.fetchTodayMeals();
        }
    }

    setAction = (action, actionPayload = {}) => this.setState({ action, actionPayload })

    fetchTodayMeals = async () => {
        const { httpClient, userAccount } = this.props;
        const { date } = this.state;

        try {
            const meals = await httpClient.dispatch(
                METHOD_USER_ACCOUNT_GET_MEALS_BY_DATE,
                UserAccount.getId(userAccount),
                date,
            );

            this.setState({ meals });
        } catch (error) {
            throw error;
        }
    }

    handleChangeDate = (date) => {
        this.setState({ date });
    }

    handleEditMeal = (meal) => this.setAction(ACTION_EDIT_MEAL, { meal })

    handleConfirmDeleteMeal = (meal) => this.setAction(ACTION_DELETE_MEAL, { meal })

    handleMealUpdated = () => {
        this.setAction(null);
        this.fetchTodayMeals();
    }

    render() {
        const { userAccount } = this.props;
        const { meals, date, action, actionPayload } = this.state;

        let content;
        if (!userAccount || !meals) {
            content = <Loading />;
        } else {
            const dayTotal = getTotal(meals);

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
                    <Typography>
                        Your meals for&nbsp;
                        <DateInput
                            value={date}
                            type={TYPE_DATE}
                            onChange={this.handleChangeDate}
                        />
                    </Typography>
                    { meals.length === 0
                        ? (
                            <Notice>
                                <Typography>Click on the + icon in the menu to add meals you ate recently</Typography>
                            </Notice>
                        )
                        : null }
                    { meals.length ? <DayBreakdown meals={meals} caloriesTarget={UserAccount.getCaloriesTarget(userAccount)} /> : null }
                    <MealList
                        meals={meals}
                        onEdit={this.handleEditMeal}
                        onDelete={this.handleConfirmDeleteMeal}
                        title={moment(date).format('dddd, MMM DD YYYY')}
                    />
                </React.Fragment>
            );
        }

        return (
            <Layout
                title="Dashboard"
                userAccount={userAccount}
                onMealAdded={this.fetchTodayMeals}
            >
                { content }
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    userAccount: getUserAccount(state),
});

export default withHttpClient(connect(mapStateToProps)(App));
