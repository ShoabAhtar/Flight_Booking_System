/* eslint-disable import/no-extraneous-dependencies */
// top npm modules
import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import session from 'express-session';


import { connect } from '../src/config/db.js';
import { router } from './Routes/routes.js'


config();

const { PORT } = process.env;
// const PORT = 8080
const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

try {
  connect();
  app.use('/api', router);
  app.all('*', (req, res) => {
    res.status(404).send('404! Page not found');
  });
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
  });
} catch (err) {
  console.log(err.message);
}


