import {
    ACTION_SET_ACCOUNT,
    ACTION_LOGOUT,
} from './actions';

const defaultState = {
    userId: null,
    account: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_SET_ACCOUNT: {
            const { account } = action.payload;

            return {
                ...state,
                account,
            };
        }

        case ACTION_LOGOUT: {
            return {
                ...state,
                account: null,
            };
        }

        default:
            return state;
    }
};
