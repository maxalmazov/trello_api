import { MongoClient } from 'mongodb';
import config from '../src/config/config';

const client = new MongoClient(`${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}`, {
  useUnifiedTopology: true
});

export default client;

