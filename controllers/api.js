var db = require('db/db');
var express = require('express');
var router = express.Router();

function get_pokemon(id){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM pokemon', (err, rows) => {
            if(err) return reject(err);

            var r = [];

            rows.forEach((row) => {
                r.push(row.name);
            });

            resolve(r);
        });
    });
}

function get_abilities(id){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM abilities JOIN pokemon_abilities ON abilities.id=pokemon_abilities.ability_id WHERE pokemon_abilities.pokemon_id=?', [id], (err, rows) => {
            if(err) return reject(err);

            var r = {};

            rows.forEach((row) => {
                r[row.name] = {
                    id: row.id
                    // slot: row.slot
                };
            });

            resolve(r);
        });
    });
}

function get_evo_chain(id){
    return new Promise((resolve, reject) => {
        db.query('SELECT y.pokemon_id FROM pokemon_evo_chain x, pokemon_evo_chain y WHERE x.chain_id=y.chain_id AND x.pokemon_id=?', [id], (err, rows) => {
            if(err) return reject(err);

            var r = [];

            rows.forEach((row) => {
                r.push(row.pokemon_id);
            });

            resolve(r);
        });
    });
}

function get_moves(id){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM moves JOIN pokemon_moves ON pokemon_moves.move_id=moves.id WHERE pokemon_moves.pokemon_id=?', [id], (err, rows) => {
            if(err) return reject(err);

            var r = {};

            rows.forEach((row) => {
                r[row.name] = row.id;
            });

            resolve(r);
        });
    });
}

function get_all_moves(id){
    return new Promise((resolve, reject) => {
        get_evo_chain(id).then((chain) => {
            var p = [];

            chain.forEach((mon) => {
                if(mon > id) return;
                p.push(get_moves(mon));
            });

            Promise.all(p).then((res) => {
                var r = {};

                res.forEach((mon) => {
                    Object.getOwnPropertyNames(mon).forEach((n) => {
                        r[n] = mon[n];
                    });
                });

                resolve(r);
            }, reject);
        });
    });
}

function get_natures(){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM natures', (err, rows) => {
            if(err) return reject(err);

            var r = {};

            rows.forEach((row) => {
                r[row.name] = row.id;
            });

            resolve(r);
        });
    });
}

function get_forms(id){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM pokemon_forms WHERE pokemon_forms.pokemon_id=?', [id, id], (err, rows) => {
            if(err) return reject(err);

            var r = {};

            rows.forEach((row) => {
                r[row.form] = row.repr;
            });

            resolve(r);
        });
    });
}

function get_gender(id){
    return new Promise((resolve, reject) => {
        db.query('SELECT gender_rate FROM pokemon_gender WHERE pokemon_gender.pokemon_id=?', [id], (err, res) => {
            if(err) return reject(err);
            if(!res.length) return resolve(null);

            res = res[0];

            resolve({
                male: res.gender_rate != -1 && res.gender_rate < 8,
                female: res.gender_rate > 0
            });
        });
    });
}

function get_name(id){
    return new Promise((resolve, reject) => {
        db.query('SELECT name FROM pokemon WHERE id=?', [id], (err, res) => {
            if(err) return reject(err);
            if(!res.length) return resolve(null);
            resolve(res[0].name);
        });
    });
}

function get_growth_curve(id){
    return new Promise((resolve, reject) => {
        db.query('SELECT x.experience FROM experience x, pokemon_growth y WHERE x.growth_rate_id=y.growth_rate_id AND y.pokemon_id=?', [id], (err, rows) => {
            if(err) return reject(err);

            r = [];

            rows.forEach((row) => {
                r.push(row.experience);
            });

            resolve(r);
        });
    });
}

function get_typing(id){
    return new Promise((resolve, reject) => {
        db.query('SELECT x.name FROM types x, pokemon_types y WHERE y.type_id=x.id AND y.pokemon_id=?', [id], (err, rows) => {
            if(err) return reject(err);

            r = [];

            rows.forEach((row) => {
                r.push(row.name);
            });

            resolve(r);
        });
    });
}

function get_items(){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM items', (err, rows) => {
            if(err) return reject(err);

            var r = {};

            rows.forEach((row) => {
                r[row.name] = row.id;
            });

            resolve(r);
        });
    });
}

function get_languages(){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM languages', (err, rows) => {
            if(err) return reject(err);

            var r = {};

            rows.forEach((row) => {
                r[row.name] = row.repr;
            });

            resolve(r);
        });
    });
}

function get_hometowns(){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM hometowns', (err, rows) => {
            if(err) return reject(err);

            var r = {};

            rows.forEach((row) => {
                r[row.name] = row.repr;
            });

            resolve(r);
        });
    });
}

function get_locations(){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM locations', (err, rows) => {
            if(err) return reject(err);

            var r = {};

            rows.forEach((row) => {
                r[row.name] = row.index;
            });

            resolve(r);
        });
    })
}

function get_pokeballs(){
    return new Promise((resolve, reject) => {
        db.query('SELECT item_id, items.name FROM pokeballs JOIN items ON items.id=pokeballs.item_id', (err, rows) => {
            if(err) return reject(err);

            var r = {};

            rows.forEach((row) => {
                r[row.name] = row.item_id;
            });

            resolve(r);
        });
    })
}

function get_encounters(){
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM encounters', (err, rows) => {
            if(err) return reject(err);

            var r = {};

            rows.forEach((row) => {
                r[row.method] = row.repr;
            });

            resolve(r);
        });
    })
}

// Because Express is stupid.
function wrapper(res){
    return function(j){
        res.json(j);
    };
}

function err_handler(res){
    return function(e){
        if(e === null){
            return res.status(404).json({
                code: 404,
                message: 'This Pokémon does not exist.'
            });
        }
        else{
            throw e;
        }
    }
}

router.get('/ability/:pokemon_id', (req, res) => {
    get_abilities(req.params.pokemon_id).then(wrapper(res), err_handler(res));
});

router.get('/moves/:pokemon_id', (req, res) => {
    get_all_moves(req.params.pokemon_id).then(wrapper(res), err_handler(res));
});

router.get('/natures', (req, res) => {
    get_natures().then(wrapper(res), err_handler(res));
});

router.get('/forms/:pokemon_id', (req, res) => {
    get_forms(req.params.pokemon_id).then(wrapper(res), err_handler(res));
});

router.get('/gender/:pokemon_id', (req, res) => {
    get_gender(req.params.pokemon_id).then(wrapper(res), err_handler(res));
});

router.get('/growth/:pokemon_id', (req, res) => {
    get_growth_curve(req.params.pokemon_id).then(wrapper(res), err_handler(res));
});

router.get('/typing/:pokemon_id', (req, res) => {
    get_typing(req.params.pokemon_id).then(wrapper(res), err_handler(res));
});

router.get('/items', (req, res) => {
    get_items().then(wrapper(res), err_handler(res));
});

router.get('/languages', (req, res) => {
    get_languages().then(wrapper(res), err_handler(res));
});

router.get('/hometowns', (req, res) => {
    get_hometowns().then(wrapper(res), err_handler(res));
});

router.get('/locations', (req, res) => {
    get_locations().then(wrapper(res), err_handler(res));
});

router.get('/pokeballs', (req, res) => {
    get_pokeballs().then(wrapper(res), err_handler(res));
});

router.get('/encounters', (req, res) => {
    get_encounters().then(wrapper(res), err_handler(res));
});

router.get('/pokemon/:pokemon_id', (req, res) => {
    var id = req.params.pokemon_id;

    Promise.all([
        get_abilities(id),
        get_all_moves(id),
        get_forms(id),
        get_gender(id),
        get_name(id),
        get_growth_curve(id),
        get_typing(id)
    ]).then((r) => {
        r = r.map(function(ele){
            if(typeof ele !== 'object') return ele;
            return Object.keys(ele).length ? ele : null;
        });

        res.json({
            abilities: r[0],
            moves: r[1],
            forms: r[2],
            gender: r[3],
            name: r[4],
            growth: r[5],
            typing: r[6]
        });
    }, err_handler(res));
});

router.get('/pokemon', (req, res) => {
    get_pokemon().then(wrapper(res), err_handler(res));
});

module.exports = router;
