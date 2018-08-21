const getUserState = (state) => state.user;

export function getUserAccount(state) {
    return getUserState(state).account;
}

export function getIsLoggedIn(state) {
    return Boolean(getUserAccount(state));
}
