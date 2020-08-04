import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as process from 'process';
import * as console from 'console';

dotenv.config();

import controllers from '../src/controllers';
import connectDatabase from './mongodb';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

async function run() {
  try {
    controllers(app);
    await connectDatabase();

    app.listen(process.env.APP_PORT, () => {
      console.log(`Running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
    });
  } catch (e) {
    console.log(e);
  } finally {
    // await client.close;
  }
}

run();
