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

export const getTotal = createSelector(
    (meals) => meals,
    (meals) => meals.reduce(
        (carry, meal) => carry + Meal.getTotalCalories(meal),
        0,
    ),
);

export const aggregateByDate = createSelector(
    (meals) => meals,
    (meals) => {
        const mealsByDate = {};

        meals.forEach((meal) => {
            const date = Meal.getEffectiveDate(meal).substr(0, 10);

            if (!mealsByDate[date]) {
                mealsByDate[date] = [];
            }

            mealsByDate[date].push(meal);
        });

        const aggregated = Object.keys(mealsByDate).map(
            (date) => {
                const meals = mealsByDate[date];

                return {
                    date,
                    totalCalories: getTotal(meals),
                    description: meals.map((meal) => `${Meal.getDescription(meal)} [${Meal.getTotalCalories(meal)}]`).join(', '),
                    time: null,
                };
            },
        );

        aggregated.sort((a, b) => a.date.localeCompare(b.date));

        return aggregated;
    },
);
