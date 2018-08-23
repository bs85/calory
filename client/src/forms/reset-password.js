import {
    ATTR_PASSWORD,
} from 'modules/user-account';

export const FIELD_PASSWORD = ATTR_PASSWORD;
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
