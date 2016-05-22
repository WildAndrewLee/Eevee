var config = require('config');
var mysql = require('mysql');

var pool = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    port: config.db_port,
    database: config.db_name
});

module.exports = {
    query: function(a, b, c){
        var fn = c || b;

        pool.getConnection((err, conn) => {
            if(err){
                console.log(err);
                throw err;
            }

            var handler = function(err, rows){
                fn(err, rows);
                conn.release();
            };

            if(c) conn.query(a, b, handler);
            else conn.query(a, handler);
        });
    }
};
