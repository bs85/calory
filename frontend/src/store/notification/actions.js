import { TYPE_SUCCESS } from 'modules/notification';

export const ACTION_CREATE = 'CREATE';
export const ACTION_DISMISS = 'DISMISS';

const SUCCESS_TIMEOUT = 3000;
let serial = 1;

export const dismiss = (id) => ({
    type: ACTION_DISMISS,
    payload: { id },
});

export const create = (type, message) => (dispatch) => {
    const id = serial++;

    dispatch({
        type: ACTION_CREATE,
        payload: { id, type, message },
    });

    if (type === TYPE_SUCCESS) {
        window.setTimeout(() => {
            dispatch(dismiss(id));
        }, SUCCESS_TIMEOUT);
    }
};

export const success = (message) => (dispatch) => {
    dispatch(create(TYPE_SUCCESS, message));
};
