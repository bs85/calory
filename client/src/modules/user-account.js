export const ATTR_ID = 'id';
export const ATTR_EMAIL = 'email';
export const ATTR_PASSWORD = 'password';
export const ATTR_FIRSTNAME = 'firstname';
export const ATTR_LASTNAME = 'lastname';
export const ATTR_USERNAME = 'username';
export const ATTR_ROLE_NAME = 'roleName';
export const ATTR_CALORIES_TARGET = 'caloriesTarget';

const UserAccount = {
    getId(account) {
        return account[ATTR_ID];
    },

    getEmail(account) {
        return account[ATTR_EMAIL];
    },

    getDisplayName(account) {
        return UserAccount.getFirstname(account);
    },

    getFirstname(account) {
        return account[ATTR_FIRSTNAME];
    },

    getLastname(account) {
        return account[ATTR_LASTNAME];
    },

    getFullName(account) {
        return `${UserAccount.getFirstname(account)} ${UserAccount.getLastname(account)}`;
    },

    getUsername(account) {
        return account[ATTR_USERNAME];
    },

    getRoleName(account) {
        return account[ATTR_ROLE_NAME];
    },

    getCaloriesTarget(account) {
        return account[ATTR_CALORIES_TARGET];
    },
};

export default UserAccount;
