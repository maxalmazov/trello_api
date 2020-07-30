import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as process from 'process';
import * as console from 'console';

dotenv.config();

import client from './mongodb';
import routes from '../src/routes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

async function run() {
  try {
    await client.connect();
    const database = client.db(process.env.MONGO_INIT_DB_NAME);

    routes(app, database);
    app.listen(process.env.APP_PORT, () => {
      console.log(`Running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
    });
  } catch (e) {
    console.log(e);
  } finally {
    await client.close;
  }
}

run();
