module.exports = (app) => {
    app.get('/whoami', (req, res) => {
        const { UserAccessToken } = app.models;

        UserAccessToken.findForRequest(req, {}, (aux, accesstoken) => {
            console.log(aux, accesstoken);
            if (typeof accesstoken === 'undefined' || UserAccessToken === null) {
                res.send(401);
                return;
            }

            const UserModel = app.models.UserAccount;
            UserModel.findById(accesstoken.userId, (err, user) => {
                if (err) {
                    res.send(500);
                    return;
                }

                res.status(200);
                res.json(user);
            });
        });
    });
};
