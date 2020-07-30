export default {
  appPort: process.env.APP_PORT || 80,
  dbHost: process.env.DB_HOST || 'mongodb://0.0.0.0',
  dbPort: process.env.DB_PORT || 27017,
  dbUser: process.env.MONGO_INITDB_ROOT_USERNAME || 'root',
  dbPass: process.env.MONGO_INITDB_ROOT_PASSWORD || 'r00t',
};
