$(function(){
    eevee.setup().then(function(){
        $('#search-input').keyup(function(){
            if(!this.value.length) return $('#thumbnails figure').show();

            $('#thumbnails figure').show();

            var thumbnails = Array.prototype.slice.call($('#thumbnails img'));

            var res = fuzzy.filter(this.value, thumbnails, {
                extract: function(ele){
                    return $(ele).data('name');
                }
            });

            $('#thumbnails figure').hide();

            res.forEach(function(r){
                $('#thumbnails figure').eq(r.index).show();
            });
        });

        $('#loading').hide();

        $('#thumbnails img').click(function(){
            var id = parseInt(this.id.split('-')[1]);
            var poke = new Pokemon(id);

            poke.load().then(function(){
                eevee._scrollTop = $(window).scrollTop();
                $('#thumbnails').hide();
                $('#search').hide();
                $('body').append(poke.render());
            });
        });
    });
});
