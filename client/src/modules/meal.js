import { createSelector } from 'reselect';
import { getMinutesFromTime } from 'lib/date-utils';

export const ATTR_ID = 'id';
export const ATTR_DESCRIPTION = 'description';
export const ATTR_EFFECTIVE_DATE = 'effectiveDate';
export const ATTR_TIME = 'time';
export const ATTR_TOTAL_CALORIES = 'totalCalories';

export const CUTOFF_BREAKFAST = '03:00';
export const CUTOFF_LUNCH = '11:00';
export const CUTOFF_DINNER = '16:00';

const Meal = {
    getId(meal) {
        return meal[ATTR_ID];
    },

    getDescription(meal) {
        return meal[ATTR_DESCRIPTION];
    },

    getEffectiveDate(meal) {
        return meal[ATTR_EFFECTIVE_DATE];
    },

    getTime(meal) {
        return meal[ATTR_TIME];
    },

    getTotalCalories(meal) {
        return meal[ATTR_TOTAL_CALORIES];
    },
};

export default Meal;

export const getBreakdown = createSelector(
    (meals) => meals,
    (meals) => {
        const breakfastMinutes = getMinutesFromTime(CUTOFF_BREAKFAST);
        const lunchMinutes = getMinutesFromTime(CUTOFF_LUNCH);
        const dinnerMinutes = getMinutesFromTime(CUTOFF_DINNER);

        return meals.reduce(
            (carry, meal) => {
                const mealMinutes = Meal.getTime(meal);

                if (mealMinutes >= dinnerMinutes) {
                    carry.dinner += Meal.getTotalCalories(meal);
                } else if (mealMinutes >= lunchMinutes) {
                    carry.lunch += Meal.getTotalCalories(meal);
                } else if (mealMinutes >= breakfastMinutes) {
                    carry.breakfast += Meal.getTotalCalories(meal);
                } else {
                    carry.dinner += Meal.getTotalCalories(meal);
                }

                carry.total += Meal.getTotalCalories(meal);

                return carry;
            },
            {
                breakfast: 0,
                lunch: 0,
                dinner: 0,
                total: 0,
            },
        );
    },
);
