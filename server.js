let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let config = require('./config/config');
let mongoose = require('mongoose');
let router = express.Router();

mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(config.database);

// Setup app variable
app.set('superSecret', config.secret);

// Setup app body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Setup logging
config.env === 'test' || app.use(morgan('dev'));

// Routes =========================================

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    next();
});


// Games
let gamesRouter = require('./controllers/routes/games');
app.use('/games', gamesRouter);

// Error handler
let errorHandlerRouter = require('./controllers/middleware/error_handler');
app.use(errorHandlerRouter);

// Run server ==================================

let port = process.env.PORT || config.port;

console.log('Server running on port: ' + config.port);
console.log('Current environment: ' + config.env);
app.listen(port);

module.exports = app;