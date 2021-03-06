import {
    ATTR_EMAIL,
    ATTR_PASSWORD,
} from 'modules/user-account';

export const FIELD_EMAIL = ATTR_EMAIL;
export const FIELD_PASSWORD = ATTR_PASSWORD;

export const FIELDS = {
    [FIELD_EMAIL]: 'Email',
    [FIELD_PASSWORD]: 'Password',
};

export const RULES = {
    [FIELD_EMAIL]: {
        presence: true,
        email: true,
    },
    [FIELD_PASSWORD]: {
        presence: true,
        length: {
            minimum: 6,
        },

    },
};

export const SAMPLE_DATA = {
    [FIELD_EMAIL]: 'aero@example.com',
    [FIELD_PASSWORD]: 'dumdidum',
};
