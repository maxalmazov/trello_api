import { MongoClient } from 'mongodb';
import config from '../src/config/config';

const user = encodeURIComponent(config.dbUser);
const pass = encodeURIComponent(config.dbPass);

const client = new MongoClient(`${user}:${pass}@${config.dbHost}:${config.dbPort}`, {
  useUnifiedTopology: true
});

export default client;
