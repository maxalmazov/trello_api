import { Db } from 'mongodb';
import * as core from 'express-serve-static-core';

const noteRoutes = (app: core.Express, db: Db): void => {
  app.get('/notes', (req, res) => {
    res.send('Hello');
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };

    db.collection('notes').insertOne(note, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};

export default noteRoutes;
