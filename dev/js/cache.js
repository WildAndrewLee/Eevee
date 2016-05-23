var cache = {
    _version: 1.1,
    _gen_key: function(k){
        return 'v' + cache._version + '_' + k;
    },
    setup: function(){
        // Delete old cache values.
        Object.keys(localStorage).forEach(function(k){
            var version = k.match(/^v(\d+(\.\d+)*)_/);

            if(!version || parseFloat(version[1]) !== cache._version){
                delete localStorage[k];
            }
        });
    },
    set: function(k, v){
        k = cache._gen_key(k);
        localStorage[k] = v;
    },
    get: function(k){
        k = cache._gen_key(k);
        return localStorage[k];
    }
};
