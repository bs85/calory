module.exports = (Meal) => {
    Meal.observe('before save', (context, next) => {
        const { instance, data, options } = context;

        const currentUserId = options.accessToken.userId;

        if (instance && !instance.userId) {
            instance.userId = currentUserId;
        }

        if (data && !data.userId) {
            context.data.userId = currentUserId;
        }

        return next();
    });

    Meal.findByDate = function findByDate(date, userId, cb) {
        const nextDay = new Date(date.valueOf());
        nextDay.setDate(nextDay.getDate() + 1);

        return Meal.find({
            where: {
                and: [
                    { eatenAt: { gte: `${date.toISOString().substr(0, 10)}T00:00:00` } },
                    { eatenAt: { lte: `${nextDay.toISOString().substr(0, 10)}T00:00:00` } },
                    { userId },
                ],
            },
        }, (error, results) => {
            if (error) {
                cb(error);
                return;
            }

            cb(null, results.map((result) => new Meal(result)));
        });
    };
};
