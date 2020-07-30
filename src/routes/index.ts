import noteRoutes from './noteRoutes';

const routes = (app, db) => {
  noteRoutes(app, db);

  app.get('/', (req, res) => {
    res.send("yep, it's working");
  });
};

export default routes;
