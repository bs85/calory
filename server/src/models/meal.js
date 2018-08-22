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
        return Meal.find({
            where: {
                and: [
                    { effectiveDate: date },
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

    Meal.findByDaterangeAndTimerange = function findByDaterangeAndTimerange(
        dateFrom,
        dateTo,
        timeFrom,
        timeTo,
        userId,
        cb,
    ) {
        const clauses = [{ userId }];

        if (dateFrom) {
            clauses.push({ effectiveDate: { gte: dateFrom } });
        }
        if (dateTo) {
            clauses.push({ effectiveDate: { lte: dateTo } });
        }
        if (timeFrom && timeTo && timeFrom > timeTo) {
            // period goes through midnight, use OR
            clauses.push({
                or: [
                    { time: { gte: timeFrom } },
                    { time: { lt: timeTo } },
                ],
            });
        } else {
            if (timeFrom) {
                clauses.push({ time: { gte: timeFrom } });
            }
            if (timeTo) {
                clauses.push({ time: { lt: timeTo } });
            }
        }

        return Meal.find(
            { where: { and: clauses } },
            (error, results) => {
                if (error) {
                    cb(error);
                    return;
                }

                cb(null, results.map((result) => new Meal(result)));
            },
        );
    };
};
