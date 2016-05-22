var API = {
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
                resolve(data)
            });
        });
    },
    get_languages: function(){
        return new Promise(function(resolve, reject){
            if(API.LANGUAGES) return resolve(API.LANGUAGES);

            getJSON('/api/languages', function(data){
                API.LANGUAGES = data;
                resolve(data)
            });
        });
    },
    get_hometowns: function(){
        return new Promise(function(resolve, reject){
            if(API.HOMETOWNS) return resolve(API.HOMETOWNS);

            getJSON('/api/hometowns', function(data){
                API.HOMETOWNS = data;
                resolve(data)
            });
        });
    },
    prepare: function(){
        return Promise.all([
            API.get_natures(),
            API.get_items(),
            API.get_languages(),
            API.get_hometowns()
        ]);
    },
    NATURES: null,
    ITEMS: null,
    LANGUAGES: null,
    HOMETOWNS: null
};
