import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Notice from 'components/widgets/notice';
import { METHOD_USER_ACCOUNT_GET_MEALS_BY_DATE } from 'routes';
import { withHttpClient } from 'components/http-client-provider';
import { getUserAccount } from 'store/user/selector';
import Layout from 'components/layout/main';
import Loading from 'components/loading';
import UserAccount from 'modules/user-account';
import Meal from 'modules/meal';
import EditMeal from 'components/edit-meal';
import DeleteMeal from 'components/delete-meal';
import Modal from 'components/modal';

const getDayTotal = createSelector(
    (meals) => meals,
    (meals) => meals.reduce(
        (carry, meal) => carry + Meal.getTotalCalories(meal),
        0,
    ),
);

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
            const dayTotal = getDayTotal(meals);

            content = (
                <React.Fragment>
                    <Modal open={action === ACTION_EDIT_MEAL} onClose={() => this.setAction(null)}>
                        <EditMeal done={this.handleMealUpdated} meal={actionPayload.meal} />
                    </Modal>
                    <Modal open={action === ACTION_DELETE_MEAL} onClose={() => this.setAction(null)}>
                        <DeleteMeal done={this.handleMealUpdated} meal={actionPayload.meal} />
                    </Modal>
                    { meals.length === 0
                        ? (
                            <Notice>
                                Click on the + icon in the menu to add meals you ate recently
                            </Notice>
                        )
                        : null }
                    Dashboard Content
                    <div>{ dayTotal } / { UserAccount.getCaloriesTarget(userAccount) }</div>
                    { meals.map((meal) => (
                        <pre onClick={() => this.handleEditMeal(meal)}>{ JSON.stringify(meal, null, '  ') }</pre>
                    ))}
                    { date.toISOString() }
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
