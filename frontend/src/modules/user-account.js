const UserAccount = {
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
        return account.role_name;
    },
};

export default UserAccount;
