var express = require('express');
var nunjucks = require('nunjucks');

var PORT = 9494;
var app = express();

var env = nunjucks.configure('views', {
    autoconfigure: true,
    watch: true,
    express: app
});

app.set('view engine', 'html');
app.set('engine', env);
app.enable('trust proxy');
app.use(express.static(__dirname + '/../' + 'static'));

app.get('/', (req, res) => {
    res.render('index');
});

module.exports = {
    start: () => {
        app.listen(PORT, (err) => {
            if(err) throw err;
            console.log(`Listening on port ${PORT}...`);
        });
    }
}
