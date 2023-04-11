const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
require('dotenv').config();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require('./config/connection');

// const routes=require('./routes')
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret:process.env.MY_SECRET_KEY,
  cookie: {
    maxAge:60000000000000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require('./routes'));
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT: http://localhost:${PORT}`));
});
