const UserAccount = {
    getId(account) {
        return account.id;
    },

    getDisplayName(account) {
        return UserAccount.getFirstname(account);
    },

    getFirstname(account) {
        return account.firstname;
    },

    getLastname(account) {
        return account.lastname;
    },

    getFullName(account) {
        return `${UserAccount.getFirstname(account)} ${UserAccount.getLastname(account)}`;
    },

    getUsername(account) {
        return account.username;
    },

    getRoleName(account) {
        return account.roleName;
    },

    getCaloriesTarget(account) {
        return account.caloriesTarget;
    },
};

export default UserAccount;
