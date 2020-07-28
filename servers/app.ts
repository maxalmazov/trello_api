import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

import mongoClient from './mongodb';
import routes from '../src/routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoClient.connect((err, database) => {
    if (err) {
        return console.log(err);
    }

    console.log('We are live on ' + process.env.DB_PORT);
});

routes(app, {});
app.listen(process.env.APP_PORT);

console.log(`Running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
