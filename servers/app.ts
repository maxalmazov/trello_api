import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as process from 'process';
import * as console from 'console';

dotenv.config();

import Controllers from '../src/controllers';
import connectDatabase from './mongodb';
import ErrorHandler from '../src/lib/ErrorHandler';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

async function run() {
  try {
    Controllers(app);
    await connectDatabase();
    app.use(ErrorHandler);

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
