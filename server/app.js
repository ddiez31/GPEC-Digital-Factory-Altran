const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const db = require('./models');

const PORT = process.env.PORT || 3000;

const app = express();

// Hook up the HTTP logger.
app.use(logger('dev'));

// Parse as urlencoded and json.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Access to repository public
app.use(express.static(__dirname + '/public'));

// Charge routes
require('./routes')(app);

app.get('/', (req, res) => res.status(200).send('Bienvenue sur le serveur!'));

if (!module.parent) {
  app.listen(PORT, () => {
    console.log('Server successfully running on port ' + PORT);
  });
  db
    .sequelize
    .authenticate()
    .then((err) => {
      console.log('Connection has been established successfully.');
    }, (err) => {
      console.log('Unable to connect to the database:', err);
    });
  db
    .sequelize
    .sync()
    .then(() => {
      console.log('database successfully synchronised');
    })
}

module.exports = app;