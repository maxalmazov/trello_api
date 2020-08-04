import * as mongoose from 'mongoose';
import config from '../src/config/config';

const client = () => mongoose.connect(
  `${config.dbHost}:${config.dbPort}/${config.dbName}`,
  {
    user: config.dbUser,
    pass: config.dbPass,
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default client;
