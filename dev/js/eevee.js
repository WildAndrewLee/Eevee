var eevee = {
    _scrollTop: $(window).scrollTop(),
    cache: cache,
    pokemon: null,
    load_image: function(url){
        return new Promise(function(resolve, reject){
            var img = new Image();

            var handler = function(){
                img.removeEventListener('load', handler);
                resolve(img);
            };

            img.addEventListener('load',handler);

            img.src = url;
        });
    },
    load_thumbnails: function(){
        return new Promise(function(resolve, reject){
            API.get_pokemon().then(function(pokemon){
                eevee.pokemon = pokemon;

                var loading = [];

                for(var n = 1; n <= pokemon.length; n++){
                    loading.push(eevee.load_image('/img/pokemon/' + n + '.png'));
                }

                Promise.all(loading).then(function(images){
                    images.forEach(function(img, n){
                        $('#thumbnails').append(
                            $('<figure>').append(
                                $(img).attr('id', 'poke-' + (n + 1))
                                    .attr('title', pokemon[n])
                                    .data('name', pokemon[n])
                            )
                        );
                    });

                    resolve();
                }, reject);
            });
        });
    },
    setup: function(){
        eevee.cache.setup();
        return eevee.load_thumbnails().then(API.prepare)
    },
    reset: function(){
        $('.editor').remove();
        $('#search').show();
        $('#thumbnails').show();
        $(window).scrollTop(eevee._scrollTop);
    }
};
