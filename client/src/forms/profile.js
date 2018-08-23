import {
    ATTR_CALORIES_TARGET,
} from 'modules/user-account';

export const FIELD_CALORIES_TARGET = ATTR_CALORIES_TARGET;

export const FIELDS = {
    [FIELD_CALORIES_TARGET]: 'Target calories per day',
};

export const RULES = {
    [FIELD_CALORIES_TARGET]: {
        presence: true,
        numericality: {
            greaterThan: 0,
        },
    },
};
