const debug = require('debug');

const d = debug('server:auth');

module.exports = (app) => {
    d('Setting up /whoami route');

    app.get('/whoami', (req, res) => {
        const { UserAccessToken } = app.models;

        UserAccessToken.findForRequest(req, {}, (aux, accessToken) => {
            if (typeof accessToken === 'undefined' || accessToken === null) {
                d('accessToken not set, aborting');
                res.send(401);
                return;
            }

            d('Searching user matching token %O', accessToken);

            const UserModel = app.models.UserAccount;
            UserModel.findById(accessToken.userId, (err, user) => {
                if (err) {
                    d('No matching user found, aborting');
                    res.send(500);
                    return;
                }

                d('Found matching user %O', user);
                res.json(user);
            });
        });
    });
};
