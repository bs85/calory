import {
    ATTR_EMAIL,
} from 'modules/user-account';

export const FIELD_EMAIL = ATTR_EMAIL;

export const FIELDS = {
    [FIELD_EMAIL]: 'Email',
};

export const RULES = {
    [FIELD_EMAIL]: {
        presence: true,
        email: true,
    },
};
