export const FIELD_DESCRIPTION = 'description';
export const FIELD_TOTAL_CALORIES = 'totalCalories';
export const FIELD_EATEN_AT = 'eatenAt';

export const FIELDS = {
    [FIELD_DESCRIPTION]: 'Description',
    [FIELD_TOTAL_CALORIES]: 'Total calories',
    [FIELD_EATEN_AT]: 'Eaten at',
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
    [FIELD_EATEN_AT]: {
        presence: true,
    },
};
