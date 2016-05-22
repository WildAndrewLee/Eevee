$(function(){
    function load_image(url){
        return new Promise(function(resolve, reject){
            var img = new Image();

            var handler = function(){
                img.removeEventListener('load', handler);
                resolve(img);
            };

            img.addEventListener('load',handler);

            img.src = url;
        });
    }

    function load_thumbnails(){
        return new Promise(function(resolve, reject){
            var loading = [];

            for(var x = 1; x <= 493; x++){
                loading.push(load_image('/img/pokemon/' + x + '.png'));
            }

            Promise.all(loading).then(function(images){
                images.forEach(function(img, n){
                    $('#thumbnails').append(
                        $('<figure>').append(
                            $(img).attr('id', 'number-' + (n + 1))
                        )
                    );
                });

                resolve();
            }, reject);
        });
    }

    load_thumbnails().then(API.prepare).then(function(){
        $('#loading').hide();

        $('#thumbnails img').click(function(){
            var id = parseInt(this.id.split('-')[1]);
            var poke = new Pokemon(id);

            poke.load().then(function(){
                $('#thumbnails').hide();
                $('body').append(poke.render());
            });
        });
    });
});
