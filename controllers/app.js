var api = require('controllers/api');
var config = require('config');
var db = require('db/db');
var express = require('express');
var nunjucks = require('nunjucks');
var path = require('path');

var PORT = 9494;
var app = express();

var env = nunjucks.configure('views', {
    autoconfigure: true,
    watch: true,
    express: app
});

app.set('json spaces',config.debug ? 4 : 0);
app.set('view engine', 'html');
app.set('engine', env);
app.enable('trust proxy');
app.use(express.static(path.join(config.path, 'static')));

app.use('/api', api);

app.get('/', (req, res) => {
    res.render('index');
});

app.use((err, req, res, next) => {
    if(err) throw err;
    next();
});

module.exports = {
    start: () => {
        app.listen(PORT, (err) => {
            if(err) throw err;
            console.log(`Listening on port ${PORT}...`);
        });
    }
}
