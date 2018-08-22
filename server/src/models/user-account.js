module.exports = (UserAccount) => {
    UserAccount.afterRemote('login', async (context) => {
        const { res, result } = context;

        res.cookie('access_token', result.id, { signed: true });
    });

    UserAccount.afterRemote('logout', async (context) => {
        const { res } = context;

        res.clearCookie('access_token');
    });

    UserAccount.prototype.mealsByDate = function mealsByDate(date, cb) {
        const { Meal } = UserAccount.app.models;

        Meal.findByDate(date, this.id, cb);
    };

    UserAccount.prototype.mealsByDaterangeAndTimerange = function mealsByDaterangeAndTimerange(dateFrom, dateTo, timeFrom, timeTo, cb) {
        const { Meal } = UserAccount.app.models;

        Meal.findByDaterangeAndTimerange(dateFrom, dateTo, timeFrom, timeTo, this.id, cb);
    };
};
