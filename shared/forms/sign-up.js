export const FIELD_FIRSTNAME = 'firstname';
export const FIELD_LASTNAME = 'lastname';
export const FIELD_EMAIL = 'email';
export const FIELD_PASSWORD = 'password';
export const FIELD_CONFIRM_PASSWORD = 'confirmPassword';

export const FIELDS = {
    [FIELD_FIRSTNAME]: 'Firstname',
    [FIELD_LASTNAME]: 'Lastname',
    [FIELD_EMAIL]: 'Email',
    [FIELD_PASSWORD]: 'Password',
    [FIELD_CONFIRM_PASSWORD]: 'Confirm Password',
}

export const RULES = {
    [FIELD_FIRSTNAME]: {
        presence: true,
        length: {
            minimum: 2,
        }
    },
    [FIELD_LASTNAME]: {
        presence: true,
        length: {
            minimum: 2,
        }
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
        equality: FIELD_PASSWORD
    },
}

export const SAMPLE_DATA = {
    [FIELD_FIRSTNAME]: 'John',
    [FIELD_LASTNAME]: 'Smith',
    [FIELD_EMAIL]: 'aero@example.com',
    [FIELD_PASSWORD]: 'dumdidum',
    [FIELD_CONFIRM_PASSWORD]: 'dumdidum',
}
