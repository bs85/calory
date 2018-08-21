export const FIELD_CALORIES_TARGET = 'caloriesTarget';

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
