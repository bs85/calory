import {
    ATTR_FIRSTNAME,
    ATTR_LASTNAME,
    ATTR_EMAIL,
    ATTR_PASSWORD,
} from 'modules/user-account';

export const FIELD_FIRSTNAME = ATTR_FIRSTNAME;
export const FIELD_LASTNAME = ATTR_LASTNAME;
export const FIELD_EMAIL = ATTR_EMAIL;
export const FIELD_PASSWORD = ATTR_PASSWORD;
export const FIELD_CONFIRM_PASSWORD = 'confirmPassword';

export const FIELDS = {
    [FIELD_FIRSTNAME]: 'Firstname',
    [FIELD_LASTNAME]: 'Lastname',
    [FIELD_EMAIL]: 'Email',
    [FIELD_PASSWORD]: 'Password',
    [FIELD_CONFIRM_PASSWORD]: 'Confirm Password',
};

export const RULES = {
    [FIELD_FIRSTNAME]: {
        presence: true,
        length: {
            minimum: 2,
        },
    },
    [FIELD_LASTNAME]: {
        presence: true,
        length: {
            minimum: 2,
        },
    },
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
    [FIELD_CONFIRM_PASSWORD]: {
        equality: FIELD_PASSWORD,
    },
};

export const SAMPLE_DATA = {
    [FIELD_FIRSTNAME]: 'John',
    [FIELD_LASTNAME]: 'Smith',
    [FIELD_EMAIL]: 'aero@example.com',
    [FIELD_PASSWORD]: 'dumdidum',
    [FIELD_CONFIRM_PASSWORD]: 'dumdidum',
};
