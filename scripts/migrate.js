const { promisify } = require('util');
const server = require('../server');
const ds = server.dataSources.db;

const tables = server.models().map(model => model.definition.name);

const additionalQueries = server.models().reduce((carry, model) => carry.concat(model.definition.settings.setupQueries || []), []);

const queryAsync = promisify(server.datasources.db.connector.query).bind(server.datasources.db.connector);
const createUser = promisify(server.models.UserAccount.create).bind(server.models.UserAccount);
const createRole = promisify(server.models.Role.create).bind(server.models.Role);

ds.automigrate(tables, async error => {
    if (error) throw error;
    console.log('Loopback tables [' + tables.join(', ') + '] created in ', ds.adapter.name);

    let query;
    while (query = additionalQueries.shift()) {
        console.log(query);
        await queryAsync(query);
    }

    const admin = await createUser({
        firstname: 'Adrian',
        lastname: 'Min',
        password: 'admin123',
        email: 'admin@example.com',
    });

    const manager = await createUser({
        firstname: 'Mandy',
        lastname: 'Anger',
        password: 'manager123',
        email: 'manager@example.com',
    })

    const adminRole = await createRole({
        name: 'admin',
    });

    const managerRole = await createRole({
        name: 'manager',
    });

    const createAdmin = promisify(adminRole.principals.create).bind(adminRole.principals);
    const createManager = promisify(managerRole.principals.create).bind(managerRole.principals);

    await createAdmin({
        principalType: server.models.RoleMapping.USER,
        principalId: admin.id
    });

    await createManager({
        principalType: server.models.RoleMapping.USER,
        principalId: manager.id
    });
});
