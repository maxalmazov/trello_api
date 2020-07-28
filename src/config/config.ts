export default {
    appPort: process.env.APP_PORT || 80,
    dbHost: process.env.DB_HOST || 'mongodb://localhost',
    dbPort: process.env.DB_PORT || 27017,
}