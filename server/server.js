const loopback = require('loopback');
const boot = require('loopback-boot');
const path = require('path');

const app = loopback();

app.start = () => (
    // start the web server
    app.listen(() => {
        app.emit('started');
        const baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server listening at: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
            const explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
    })
);

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(
    app,
    {
        appRootDir: path.join(__dirname, '../config'),
        appConfigRootDir: path.join(__dirname, '../config'),
        modelSources: [
            'loopback/common/models',
            'loopback/server/models',
            path.join(__dirname, '../src/models'),
        ],
        mixinSources: [
            '../node_modules/loopback-ds-readonly-mixin/lib',
            '../node_modules/loopback-ds-timestamp-mixin',
        ],
        bootDirs: [path.join(__dirname, '../boot')],
    },
    (err) => {
        if (err) throw err;

        app.use(loopback.token({
            cookies: ['access_token'],
            model: app.models.UserAccessToken,
        }));

        // start the server if `$ node server.js`
        if (require.main === module) app.start();
    },
);

module.exports = app;
