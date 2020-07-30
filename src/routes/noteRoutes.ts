const noteRoutes = (app, db) => {
  app.get('/notes', (req, res) => {
    res.send('Hello');
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };

    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};

export default noteRoutes;
