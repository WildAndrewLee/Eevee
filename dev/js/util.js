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

function show_progress(p){
    if(p === 100) return $('#progress').width(0).hide();
    $('#progress').css('width', p + '%').show();
}

function getJSON(url, fn, fail){
    show_progress(0);

    $.ajax({
        dataType: 'json',
        xhr: function(){
            var xhr = new XMLHttpRequest();

            xhr.addEventListener('progress', function(e){
                var percent = e.loaded / e.total;
                show_progress(percent * 100);
            });

            return xhr;
        },
        success: function(data){
            show_progress(100);
            fn(data);
        },
        fail: function(){
            if(fail) fail();
        },
        url: url
    });
}

function buff_to_num(buff){
    var num = 0;

    buff.forEach(function(byte, pos){
        num |= byte << ((buff.length - pos - 1) * 4);
    });

    return num;
}

function swap_endian(num){
    return ((num >> 24) & 0xFF) | (((num >> 16) & 0xFF) << 8) | (((num >> 8) & 0xFF) << 16) | ((num & 0xFF) << 24);
}

function format_date(date){
    var month = date.getMonth() + 1 + ''; // Month is zero indexed.
    var day = date.getDate() + '';
    var year = date.getFullYear() + '';

    if(day.length < 2) day = '0' + day;
    if(month.length < 2) month = '0' + month;

    return year + '-' + month + '-' + day;
}
