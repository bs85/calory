import Notification from 'modules/notification';

import {
    ACTION_CREATE,
    ACTION_DISMISS,
} from './actions';

const defaultState = {
    notifications: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_DISMISS: {
            const { id } = action.payload;

            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => Notification.getId(notification) !== id,
                ),
            };
        }

        case ACTION_CREATE: {
            const { id, type, message } = action.payload;

            return {
                ...state,
                notifications: state.notifications.concat([{
                    id,
                    type,
                    message,
                }]),
            };
        }

        default:
            return state;
    }
};
