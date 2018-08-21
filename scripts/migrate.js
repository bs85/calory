const { promisify } = require('util');
const server = require('../server');
const ds = server.dataSources.db;

const tables = server.models().map(model => model.definition.name);

const additionalQueries = server.models().reduce((carry, model) => carry.concat(model.definition.settings.setupQueries || []), []);

const queryAsync = promisify(server.datasources.db.connector.query).bind(server.datasources.db.connector);

ds.automigrate(tables, async error => {
    if (error) throw error;
    console.log('Loopback tables [' + tables.join(', ') + '] created in ', ds.adapter.name);

    let query;
    while (query = additionalQueries.shift()) {
        console.log(query);
        await queryAsync(query);
    }

    ds.disconnect();
});
