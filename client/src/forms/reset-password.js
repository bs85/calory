export const FIELD_PASSWORD = 'password';
export const FIELD_CONFIRM_PASSWORD = 'confirmPassword';

export const FIELDS = {
    [FIELD_PASSWORD]: 'Password',
    [FIELD_CONFIRM_PASSWORD]: 'Confirm Password',
};

export const RULES = {
    [FIELD_PASSWORD]: {
        presence: true,
        length: {
            minimum: 6,
        },

    },
    [FIELD_CONFIRM_PASSWORD]: {
        equality: FIELD_PASSWORD,
    },
};

export const SAMPLE_DATA = {
    [FIELD_PASSWORD]: 'dumdidum',
    [FIELD_CONFIRM_PASSWORD]: 'dumdidum',
};
