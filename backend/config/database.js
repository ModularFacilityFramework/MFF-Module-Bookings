const mariadb = require('mariadb');

// Own database, own credentials. mff-core provisions both at Install/Update
// time and writes them into its one .env as MODULE_BOOKINGS_DB_*;
// coreApi.getModuleConfig() returns them with that prefix stripped (see
// docs/MFF-Core_module-core-api.md). This module has no .env of its own.
//
// backend/index.js shadows coreApi.pool with this pool unconditionally.
module.exports = function createModulePool(coreApi) {
  const config = coreApi.getModuleConfig();
  return mariadb.createPool({
    host: config.DB_HOST || '127.0.0.1',
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    connectionLimit: Number(config.DB_CONNECTION_LIMIT) || 5,
    bigIntAsNumber: true,
    insertIdAsNumber: true
  });
};
