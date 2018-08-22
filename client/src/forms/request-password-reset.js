export const FIELD_EMAIL = 'email';

export const FIELDS = {
    [FIELD_EMAIL]: 'Email',
};

export const RULES = {
    [FIELD_EMAIL]: {
        presence: true,
        email: true,
    },
};
