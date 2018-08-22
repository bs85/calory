const debug = require('debug');
const mailer = require('nodemailer');

const d = debug('calory:auth');

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

    UserAccount.on('resetPasswordRequest', (info) => {
        const config = { host: 'localhost', port: 3000 };

        const url = `http://${config.host}:${config.port}/reset-password`;
        console.log(info);
        const html = `Click <a href="${url}?access_token=${info.accessToken.id}">here</a> to reset your password`;

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const transporter = mailer.createTransport({
            name: 'localhost',
            port: 25,
        });

        transporter.sendMail({
            from: info.email,
            to: info.email,
            subject: 'Password reset',
            html,
        }, (err) => {
            if (err) {
                d('Error sending password reset email');
                d(err);
                return;
            }

            d('Sending password reset email to: %s', info.email);
        });
    });
};
