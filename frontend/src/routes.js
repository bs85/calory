import get from 'lodash.get';

import {
    ValidationError,
} from 'lib/http-client';

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const PATCH = 'patch';
const DELETE = 'delete';

export const ENDPOINT_API = 'api/';
export const ENDPOINT_WHOAMI = 'whoami/';

export const MODEL_USER_ACCOUNT = 'UserAccounts';
export const MODEL_MEAL = 'Meals';

export const ACTION_USER_ACCOUNT_LOGIN = 'login';
export const ACTION_USER_ACCOUNT_LOGOUT = 'logout';
export const ACTION_USER_ACCOUNT_CHANGE_PASSWORD = 'change-password';
export const ACTION_USER_ACCOUNT_MEALS = 'meals';
export const ACTION_USER_ACCOUNT_MEALS_BY_DATE = 'mealsByDate';

export const METHOD_WHOAMI = 'METHOD_WHOAMI';

export const METHOD_USER_ACCOUNT_CREATE = 'METHOD_USER_ACCOUNT_CREATE';
export const METHOD_USER_ACCOUNT_LOGIN = 'METHOD_USER_ACCOUNT_LOGIN';
export const METHOD_USER_ACCOUNT_LOGOUT = 'METHOD_USER_ACCOUNT_LOGOUT';
export const METHOD_USER_ACCOUNT_GET = 'METHOD_USER_ACCOUNT_GET';
export const METHOD_USER_ACCOUNT_GET_MEALS = 'METHOD_USER_ACCOUNT_GET_MEALS';
export const METHOD_USER_ACCOUNT_GET_MEALS_BY_DATE = 'METHOD_USER_ACCOUNT_GET_MEALS_BY_DATE';
export const METHOD_USER_ACCOUNT_SAVE_PROFILE = 'METHOD_USER_ACCOUNT_SAVE_PROFILE';
export const METHOD_USER_ACCOUNT_CHANGE_PASSWORD = 'METHOD_USER_ACCOUNT_CHANGE_PASSWORD';

export const METHOD_MEAL_CREATE = 'METHOD_MEAL_CREATE';
export const METHOD_MEAL_UPDATE = 'METHOD_MEAL_UPDATE';
export const METHOD_MEAL_DELETE = 'METHOD_MEAL_DELETE';

export const METHODS = {
    [METHOD_WHOAMI]: () => ({
        url: `${ENDPOINT_WHOAMI}`,
        verb: GET,
    }),

    [METHOD_USER_ACCOUNT_CREATE]: ({
        firstname,
        lastname,
        email,
        password,
    }) => ({
        url: `${ENDPOINT_API}${MODEL_USER_ACCOUNT}`,
        verb: POST,
        data: {
            firstname,
            lastname,
            email,
            password,
        },
        onError(error) {
            if (error instanceof ValidationError) {
                const emailErrors = get(error.data, ['error', 'details', 'codes', 'email']);

                if (emailErrors && emailErrors.indexOf('uniqueness') !== -1) {
                    error.message = 'Email address is already in use';
                }
            }

            throw error;
        },
    }),

    [METHOD_USER_ACCOUNT_SAVE_PROFILE]: (id, { caloriesTarget }) => ({
        url: `${ENDPOINT_API}${MODEL_USER_ACCOUNT}/${id}`,
        verb: PATCH,
        data: { caloriesTarget },
    }),

    [METHOD_USER_ACCOUNT_LOGIN]: ({ email, password }) => ({
        url: `${ENDPOINT_API}${MODEL_USER_ACCOUNT}/${ACTION_USER_ACCOUNT_LOGIN}`,
        verb: POST,
        data: { email, password },
    }),

    [METHOD_USER_ACCOUNT_LOGOUT]: () => ({
        url: `${ENDPOINT_API}${MODEL_USER_ACCOUNT}/${ACTION_USER_ACCOUNT_LOGOUT}`,
        verb: POST,
    }),

    [METHOD_USER_ACCOUNT_CHANGE_PASSWORD]: ({ oldPassword, newPassword }) => ({
        url: `${ENDPOINT_API}${MODEL_USER_ACCOUNT}/${ACTION_USER_ACCOUNT_CHANGE_PASSWORD}`,
        verb: POST,
        data: { oldPassword, newPassword },
        onError(error) {
            const errorCode = get(error, ['data', 'error', 'code']);
            if (errorCode === 'INVALID_PASSWORD') {
                error.message = 'Invalid password';
            }

            throw error;
        },
    }),

    [METHOD_USER_ACCOUNT_GET]: (id) => ({
        url: `${ENDPOINT_API}${MODEL_USER_ACCOUNT}/${id}`,
        verb: GET,
    }),

    [METHOD_USER_ACCOUNT_GET_MEALS]: (id) => ({
        url: `${ENDPOINT_API}${MODEL_USER_ACCOUNT}/${id}/${ACTION_USER_ACCOUNT_MEALS}`,
        verb: GET,
    }),

    [METHOD_USER_ACCOUNT_GET_MEALS_BY_DATE]: (id, date) => ({
        url: `${ENDPOINT_API}${MODEL_USER_ACCOUNT}/${id}/${ACTION_USER_ACCOUNT_MEALS_BY_DATE}?date=${date.toISOString().substr(0, 10)}`,
        verb: POST,
    }),

    [METHOD_MEAL_CREATE]: (userId, { description, totalCalories, eatenAt }) => ({
        url: `${ENDPOINT_API}${MODEL_USER_ACCOUNT}/${userId}/${ACTION_USER_ACCOUNT_MEALS}`,
        verb: POST,
        data: { description, totalCalories, eatenAt },
    }),

    [METHOD_MEAL_UPDATE]: (
        userId,
        mealId,
        {
            description,
            totalCalories,
            eatenAt,
        },
    ) => ({
        url: `${ENDPOINT_API}${MODEL_USER_ACCOUNT}/${userId}/${ACTION_USER_ACCOUNT_MEALS}/${mealId}`,
        verb: PUT,
        data: {
            description,
            totalCalories,
            eatenAt,
        },
    }),

    [METHOD_MEAL_DELETE]: (userId, mealId) => ({
        url: `${ENDPOINT_API}${MODEL_USER_ACCOUNT}/${userId}/${ACTION_USER_ACCOUNT_MEALS}/${mealId}`,
        verb: DELETE,
    }),
};
