export const ACTION_SET_ACCOUNT = 'SET_ACCOUNT';
export const ACTION_LOGOUT = 'LOGOUT';

export const setAccount = (account) => ({
    type: ACTION_SET_ACCOUNT,
    payload: { account },
});

export const logout = () => ({
    type: ACTION_LOGOUT,
    payload: {},
});
