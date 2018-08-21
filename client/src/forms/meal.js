import {
    ATTR_DESCRIPTION,
    ATTR_TOTAL_CALORIES,
    ATTR_EFFECTIVE_DATE,
    ATTR_TIME,
} from 'modules/meal';

export const FIELD_DESCRIPTION = ATTR_DESCRIPTION;
export const FIELD_TOTAL_CALORIES = ATTR_TOTAL_CALORIES;
export const FIELD_EFFECTIVE_DATE = ATTR_EFFECTIVE_DATE;
export const FIELD_TIME = ATTR_TIME;

export const FIELDS = {
    [FIELD_DESCRIPTION]: 'Description',
    [FIELD_TOTAL_CALORIES]: 'Total calories',
    [FIELD_EFFECTIVE_DATE]: 'Date',
    [FIELD_TIME]: 'Time',
};

export const RULES = {
    [FIELD_DESCRIPTION]: {
        presence: true,
    },
    [FIELD_TOTAL_CALORIES]: {
        presence: true,
        numericality: {
            greaterThan: 0,
        },
    },
    [FIELD_EFFECTIVE_DATE]: {
        presence: true,
    },
    [FIELD_TIME]: {
        presence: true,
    },
};
