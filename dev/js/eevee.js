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
        return eevee.load_thumbnails().then(API.prepare);
    },
    reset: function(){
        $('.editor').remove();
        $('#search').show();
        $('#thumbnails').show();
        $(window).scrollTop(eevee._scrollTop);
    },
    save: function(poke){
        var buffer = new ArrayBuffer(136);
        var view = new DataView(buffer);

        for(var n = 0; n < 136; n++){
            view.setUint8(n, 0);
        }

        // BLOCK A

        view.setUint16(0x8, poke.id, true);
        view.setUint16(0xA, poke.item, true);
        view.setUint16(0xC, poke.trainer_id_pub, true);
        view.setUint16(0xE, poke.trainer_id_secret, true);
        view.setUint32(0x10, poke.exp, true);
        view.setUint8(0x14, poke.friendship);
        view.setUint8(0x15, poke.ability.id);
        view.setUint8(0x17, poke.lang);
        view.setUint8(0x18, poke.ev.hp);
        view.setUint8(0x19, poke.ev.att);
        view.setUint8(0x1A, poke.ev.def);
        view.setUint8(0x1B, poke.ev.spd);
        view.setUint8(0x1C, poke.ev.special_att);
        view.setUint8(0x1D, poke.ev.special_def);

        // Skipping all contest data for now...

        // BLOCK B

        view.setUint16(0x28, poke.move1, true);
        view.setUint16(0x2A, poke.move2, true);
        view.setUint16(0x2C, poke.move3, true);
        view.setUint16(0x2E, poke.move4, true);

        // TODO: Put PP values in database.

        view.setUint8(0x30, 0);
        view.setUint8(0x31, 0);
        view.setUint8(0x32, 0);
        view.setUint8(0x33, 0);

        view.setUint8(0x34, poke.ppup1);
        view.setUint8(0x35, poke.ppup2);
        view.setUint8(0x36, poke.ppup3);
        view.setUint8(0x37, poke.ppup4);

        var meta_data = 0;

        meta_data |= poke.iv.hp << 0 >>> 0;
        meta_data |= poke.iv.att << 5 >>> 0;
        meta_data |= poke.iv.def << 10 >>> 0;
        meta_data |= poke.iv.spd << 15 >>> 0;
        meta_data |= poke.iv.special_att << 20 >>> 0;
        meta_data |= poke.iv.special_def << 25 >>> 0;
        meta_data |= poke.egg << 30 >>> 0;
        meta_data |= !!poke.nickname.length << 31 >>> 0;

        view.setUint32(0x38, meta_data, true);

        var met_data = 0;

        met_data |= poke.fateful_encounter;
        met_data |= (poke.gender === Pokemon.FEMALE) << 1;
        met_data |= poke.is_genderless() << 2;
        met_data |= poke.form << 3 >> 0;

        view.setUint8(0x40, met_data);

        if(poke.met_egg){
            view.setUint16(0x44, poke.egg_location, true);
        }
        else{
            view.setUint16(0x46, poke.location, true);
        }

        var out = new Uint8Array(buffer);
        var hex = '';
        var alphabet = '0123456789ABCDEF';
        var pack_length = 0;
        var packs = 0;

        for(n = 0; n < out.length; n++){
            if(pack_length === 4){
                pack_length = 0;
                packs++;

                if(packs !== 8){
                    hex += ' ';
                }
            }

            if(packs === 8){
                hex += '\n';
                pack_length = 0;
                packs = 0;
            }

            hex += alphabet.charAt(out[n] >> 4);
            hex += alphabet.charAt(out[n] & 0xF);

            pack_length += 2;
        }

        console.log(hex);

        /**
         * Generate PID.
         */

        var PID = 0;

        // Pokemon gender.
        if(poke.only_male()){
            // Do nothing. A gender value of 0 means only male.
        }
        else if(poke.only_female()){
            PID |= 0xFE; // 0xFE is only female.
        }
        else if(poke.is_genderless()){
            PID |= 0xFF; // 0xFF is genderless.
        }
        else{
            PID |= poke.gender;
        }

        // Pokemon nature.
        if(PID % 25 !== poke.nature){
            PID += poke.nature - (PID % 25);
        }

        // Pokemon shininess.
        function is_shiny(p1, p2){
            var s = poke.trainer_id_pub ^ poke.trainer_id_secret ^ p1 ^ p2;
            return s < 8;
        }

        for(n = new Uint32Array([0]); n[0] < 65535; n[0]++){
            if(is_shiny(n[0], PID) === poke.shiny){
                PID |= n[0] << 16;
                break;
            }
        }

        // Pokemon ability.
        if(!poke.is_genderless()){
            var slot = poke.ability.slot - 1;

            while(PID % 2 !== slot){
                PID += 25;
            }
        }

        console.log(PID);
    }
};
