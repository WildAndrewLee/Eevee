var fs = require('fs');

var secrets = fs.readFileSync('/pokemon/secrets.json');
secrets = JSON.parse(secrets);

module.exports = {
    path: __dirname
};

Object.getOwnPropertyNames(secrets).forEach((prop) => {
    module.exports[prop] = secrets[prop];
});

secrets = null;
