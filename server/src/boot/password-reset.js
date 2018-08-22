const debug = require('debug');

const d = debug('calory:auth');

module.exports = (server) => {
    server.post('/request-password-reset', (req, res) => {
        server.models.UserAccount.resetPassword({
            email: req.body.email,
        }, (err) => {
            if (err) {
                d('User with email %s not found', req.body.email);
                d(err);
                res.status(401).send(err);
                return;
            }

            d('Sent a password recovery link to %s', req.body.email);
            res.send(200);
        });
    });

    server.use('/reset-password', (req, res) => {
        server.models.UserAccessToken.findForRequest(req, {}, (aux, accessToken) => {
            if (!accessToken) {
                d('No valid access token found');
                res.sendStatus(404);
                return;
            }

            server.models.UserAccount.findById(accessToken.userId, (err, user) => {
                if (err) {
                    d('Invalid token for password reset: %=', req.accessToken);
                    d(err);
                    res.sendStatus(404);
                    return;
                }

                // eslint-disable-next-line no-shadow
                user.updateAttribute('password', req.body.password, (err) => {
                    if (err) {
                        d('Update user failed');
                        d(err);
                        res.sendStatus(404);
                        return;
                    }

                    res.send('success');
                });
            });
        });
    });
};
