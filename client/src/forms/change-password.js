export const FIELD_OLD_PASSWORD = 'oldPassword';
export const FIELD_NEW_PASSWORD = 'newPassword';
export const FIELD_CONFIRM_NEW_PASSWORD = 'confirmNewPassword';

export const FIELDS = {
    [FIELD_OLD_PASSWORD]: 'Old Password',
    [FIELD_NEW_PASSWORD]: 'New Password',
    [FIELD_CONFIRM_NEW_PASSWORD]: 'Confirm Password',
};

export const RULES = {
    [FIELD_OLD_PASSWORD]: {
        presence: true,
    },
    [FIELD_NEW_PASSWORD]: {
        presence: true,
        length: {
            minimum: 6,
        },

    },
    [FIELD_CONFIRM_NEW_PASSWORD]: {
        presence: true,
        equality: FIELD_NEW_PASSWORD,
    },
};
