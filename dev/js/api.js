var API = {
    get_pokemon: function(){
        return new Promise(function(resolve, reject){
            getJSON('/api/pokemon', resolve);
        });
    },
    get_pokemon_info: function(id){
        return new Promise(function(resolve, reject){
            getJSON('/api/pokemon/' + id, resolve);
        });
    },
    get_natures: function(){
        return new Promise(function(resolve, reject){
            if(API.NATURES) return resolve(API.NATURES);

            getJSON('/api/natures', function(data){
                API.NATURES = data;
                resolve(data);
            });
        });
    },
    get_items: function(){
        return new Promise(function(resolve, reject){
            if(API.ITEMS) return resolve(API.ITEMS);

            getJSON('/api/items', function(data){
                API.ITEMS = data;
                resolve(data);
            });
        });
    },
    get_languages: function(){
        return new Promise(function(resolve, reject){
            if(API.LANGUAGES) return resolve(API.LANGUAGES);

            getJSON('/api/languages', function(data){
                API.LANGUAGES = data;
                resolve(data);
            });
        });
    },
    get_hometowns: function(){
        return new Promise(function(resolve, reject){
            if(API.HOMETOWNS) return resolve(API.HOMETOWNS);

            getJSON('/api/hometowns', function(data){
                API.HOMETOWNS = data;
                resolve(data);
            });
        });
    },
    get_locations: function(){
        return new Promise(function(resolve, reject){
            if(API.LOCATIONS) return resolve(API.LOCATIONS);

            getJSON('/api/locations', function(data){
                API.LOCATIONS = data;
                resolve(data);
            });
        });
    },
    get_pokeballs: function(){
        return new Promise(function(resolve, reject){
            if(API.POKEBALLS) return resolve(API.POKEBALLS);

            getJSON('/api/pokeballs', function(data){
                API.POKEBALLS = data;
                resolve(data);
            });
        });
    },
    get_encounters: function(){
        return new Promise(function(resolve, reject){
            if(API.ENCOUNTER_OPTIONS) return resolve(API.ENCOUNTER_OPTIONS);

            getJSON('/api/encounters', function(data){
                API.ENCOUNTER_OPTIONS = data;
                resolve(data);
            });
        });
    },
    prepare: function(){
        return Promise.all([
            API.get_natures(),
            API.get_items(),
            API.get_languages(),
            API.get_hometowns(),
            API.get_locations(),
            API.get_encounters()
        ]).then(API.get_pokeballs);
    },
    NATURES: null,
    ITEMS: null,
    POKEBALLS: null,
    LANGUAGES: null,
    HOMETOWNS: null,
    LOCATIONS: null,
    ENCOUNTER_OPTIONS: null
};
