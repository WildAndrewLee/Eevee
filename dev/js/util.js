function normalize(str){
    return str[0].toUpperCase() + str.substring(1);
}

function options_from_obj(obj){
    var options = [];

    Object.getOwnPropertyNames(obj).forEach(function(prop){
        options.push([JSON.stringify(obj[prop]), prop]);
    });

    return options;
}

function alpha_order_options(options){
    var new_options = options.slice();

    new_options.sort(function(a, b){
        return a[1].localeCompare(b[1]);
    });

    return new_options;
}
