function Pokemon(id){
    this.id = id;

    /**
     * Basic Info
     */

    this.name = null;
    this.nickname = null;

    this.valid_moves = null;
    this.valid_abilities = null;
    this.valid_natures = null;
    this.valid_forms = null;

    this.ability = 1;
    this.nature = 0;

    this.exp_curve = null;
    this.level = 1;
    this.exp = 0;
    this.held_item = 0;
    this.happiness = 0;
    this.form = null;

    this.language = 2; // Default to English.
    this.origin = 7; // Default to HG.

    this.gender = Pokemon.MALE; // Default to male.

    this.egg = false;
    this.shiny = false;
    this.pokerus1 = 0;
    this.pokerus2 = 0;

    /**
     * Met Info
     */

    this.location = 92; // GTS.
    this.ball = 4; // Park Ball.
    this.met_date = format_date(new Date()); // Today.
    this.met_level = 1;
    this.encounter = 0; // Default to Pal Park/Egg/Special Event.
    this.fateful_encounter = false;
    this.met_egg = false;
    this.egg_location = 126; // New Bark Town.
    this.egg_date = format_date(new Date()); // Today.

    /**
     * Stats
     */

    this.iv = {
        hp: 31,
        att: 31,
        def: 31,
        special_att: 31,
        special_def: 31,
        spd: 31
    };

    this.ev = {
        hp: 0,
        att: 0,
        def: 0,
        special_att: 0,
        special_def: 0,
        spd: 0
    };

    /**
     * Moves
     */

    this.move1 = null;
    this.move2 = null;
    this.move3 = null;
    this.move4 = null;

    this.ppup1 = 0;
    this.ppup2 = 0;
    this.ppup3 = 0;
    this.ppup4 = 0;

    /**
     * Ribbons
     */

    /**
     * Misc
     */

    this.trainer_gender = Pokemon.MALE;
    this.trainer_id_pub = 12345;
    this.trainer_id_secret = 12345;
}

Pokemon.MALE = 0xC0; // Leave last bit as 0 for ability.
Pokemon.FEMALE = 0x2; // Leave last bit as 0 for ability.
Pokemon.GENDERLESS = 0xFF;
Pokemon.MALE_ONLY = 0x0;
Pokemon.FEMALE_ONLY = 0xFE;

Pokemon.prototype.load = function(){
    function do_stuff(data){
        that.name = data.name;
        that.valid_forms = data.forms;
        that.valid_moves = data.moves;
        that.valid_abilities = data.abilities;
        that.exp_curve = data.growth;
        that.typing = data.typing;
        that.valid_gender = data.gender;

        if(that.is_genderless()) that.gender = Pokemon.GENDERLESS;
        else if(that.only_male()) that.gender = Pokemon.MALE;
        else if(that.only_female()) that.gender = Pokemon.FEMALE;
    }

    var that = this;
    var cache = eevee.cache.get('pokemon-data-' + this.id);

    if(cache){
        return new Promise(function(resolve, reject){
            do_stuff(JSON.parse(cache));
            resolve(cache);
        });
    }

    return API.get_pokemon_info(this.id).then(function(data){
        eevee.cache.set('pokemon-data-' + that.id, JSON.stringify(data));
        do_stuff(data);
    });
};

Pokemon.prototype.exp_for_level = function(lvl){
    return this.exp_curve[lvl - 1];
};

/*
We do not need to check out of bounds levels
because the level field is a number field.
 */
Pokemon.prototype.level_from_exp = function(exp){
    for(var n = 0; n < this.exp_curve.length; n++){
        if(this.exp_curve[n] > exp){
            return n;
        }
    }
};

Pokemon.prototype.is_genderless = function(){
    return !this.valid_gender.male && !this.valid_gender.female;
};

Pokemon.prototype.only_male = function(){
    return this.valid_gender.male && !this.valid_gender.female;
};

Pokemon.prototype.only_female = function(){
    return !this.valid_gender.male && this.valid_gender.female;
};

Pokemon.prototype.apply = function(){
    this.nickname = this.$nickname.val();
    this.nature = this.$nature.val();
    this.ability = JSON.parse(this.$ability.val());
    this.level = this.$level.val();
    this.exp = this.$exp.val();
    this.held_item = this.$held.val();
    this.happiness = this.$happiness.val();
    this.form = this.$form.val();
    this.lang = this.$lang.val();
    this.origin = this.$origin.val();
    this.gender = this.$gender.val();
    this.egg = this.$egg.check();
    this.shiny = this.$shiny.check();
    this.pokerus1 = this.$pokerus1.val();
    this.pokerus2 = this.$pokerus2.val();
    this.location = this.$location.val();
    this.ball = this.$ball.val();
    this.met_level = this.$met_level.val();
    this.met_date = this.$met_date.val();
    this.encounter = this.$encounter.val();
    this.fateful_encounter = this.$fateful_encounter.val();
    this.met_egg = this.$met_egg.check();
    this.egg_location = this.$egg_location.val();
    this.egg_date = this.$egg_date.val();

    this.iv = {
        hp: this.$hp_iv.val(),
        att: this.$att_iv.val(),
        def: this.$def_iv.val(),
        special_att: this.$special_att_iv.val(),
        special_def: this.$special_def_iv.val(),
        spd: this.$spd_iv.val()
    };

    this.ev = {
        hp: this.$hp_ev.val(),
        att: this.$att_ev.val(),
        def: this.$def_ev.val(),
        special_att: this.$special_att_ev.val(),
        special_def: this.$special_def_ev.val(),
        spd: this.$spd_ev.val()
    };

    this.move1 = this.$move1.val();
    this.move2 = this.$move2.val();
    this.move3 = this.$move3.val();
    this.move4 = this.$move4.val();

    this.ppup1 = this.$ppup1.val();
    this.ppup2 = this.$ppup2.val();
    this.ppup3 = this.$ppup3.val();
    this.ppup4 = this.$ppup4.val();

    this.trainer_gender = this.$trainer_gender.val();
    this.trainer_id_pub = this.$trainer_id_pub.val();
    this.trainer_id_secret = this.$trainer_id_secret.val();
};

Pokemon.prototype.render = function(){
    /**
     * DOM Elements for Main
     */

    var that = this;

    var nature_options = alpha_order_options(options_from_obj(API.NATURES));
    var item_options = alpha_order_options(options_from_obj(API.ITEMS));
    var ability_options = alpha_order_options(options_from_obj(this.valid_abilities));
    var form_options = [[0, 'Not Available']];
    var language_options = alpha_order_options(options_from_obj(API.LANGUAGES));
    var hometown_options = alpha_order_options(options_from_obj(API.HOMETOWNS));
    var location_options = alpha_order_options(options_from_obj(API.LOCATIONS));
    var ball_options = alpha_order_options(options_from_obj(API.POKEBALLS));
    var encounter_options = alpha_order_options(options_from_obj(API.ENCOUNTER_OPTIONS));
    var move_options = alpha_order_options(options_from_obj(this.valid_moves));

    if(this.valid_forms){
        form_options = alpha_order_options(options_from_obj(this.valid_forms));
    }

    this.$thumbnail = $('<img>').attr('src', '/img/pokemon/' + this.id + '.png');
    this.$typing = $('<div>').addClass('typing');

    this.typing.forEach(function(type){
        that.$typing.append(
            $('<span>').addClass('type').addClass(type).text(normalize(type))
        );
    });

    this.$name = Field({
        label: 'Pokémon Name',
        value: this.name,
        disabled: true
    });

    this.$nickname = Field({
        label: 'Nickname',
        value: this.nickname
    });

    this.$nature = Field({
        label: 'Nature',
        type: 'select',
        options: nature_options,
        selected: this.nature
    });

    this.$ability = Field({
        label: 'Ability',
        type: 'select',
        options: ability_options,
        selected: ability_options[0][0]
    }).change(function(v){
        that.ability = v;
    });

    this.$level = Field({
        label: 'Level',
        type: 'number',
        min: 1,
        max: 100,
        value: this.level
    }).change(function(v){
        that.$exp.val(that.exp_for_level(v));
    });

    this.$exp = Field({
        label: 'Experience',
        type: 'number',
        min: 0,
        max: this.exp_curve[this.exp_curve.length - 1],
        value: this.exp
    }).change(function(v){
        that.$level.val(that.level_from_exp(v));
    });

    this.$held = Field({
        label: 'Held Item',
        type: 'select',
        options: item_options,
        selected: this.held_item
    });

    this.$happiness = Field({
        label: 'Happiness',
        type: 'number',
        min: 0,
        max: 255,
        value: this.happiness,
    });

    this.$form = Field({
        label: 'Form',
        type: 'select',
        disabled: !this.valid_forms,
        selected: this.form === null ? 0 : this.form,
        options: form_options
    });

    this.$lang = Field({
        label: 'Language',
        type: 'select',
        selected: this.language,
        options: language_options
    });

    this.$origin = Field({
        label: 'Origin',
        type: 'select',
        selected: this.origin,
        options: hometown_options
    });

    this.$gender = Field({
        label: 'Gender',
        type: 'select',
        selected: this.gender,
        options: this.is_genderless() ? [[Pokemon.GENDERLESS, 'Genderless']] : [
            [Pokemon.MALE, 'Male'],
            [Pokemon.FEMALE, 'Female']
        ],
        disabled: this.is_genderless() || this.only_male() || this.only_female()
    });

    this.$egg = Field({
        label: 'Egg',
        type: 'check',
        checked: this.egg
    }).change(function(v){
        if(v) that.$met_egg.disable();
        else that.$met_egg.enable();
    });

    this.$shiny = Field({
        label: 'Shiny',
        type: 'check',
        checked: this.shiny
    });

    this.$pokerus1 = Field({
        label: 'Pokérus Strain',
        type: 'number',
        min: 0,
        max: 4,
        value: this.pokerus1
    });

    this.$pokerus2 = Field({
        label: 'Pokérus Duration',
        type: 'number',
        min: 0,
        max: 4,
        value: this.pokerus2
    });

    var $main_fields = $('<aside>').addClass('fields main')
        .append(this.$name.render())
        .append(this.$nickname.render())
        .append(this.$nature.render())
        .append(this.$ability.render())
        .append(
            $('<div>').addClass('input-grouped')
                .append(this.$level.render())
                .append(this.$exp.render())
        )
        .append(this.$held.render())
        .append(this.$happiness.render())
        .append(this.$form.render())
        .append(this.$lang.render())
        .append(this.$origin.render())
        .append(this.$gender.render())
        .append(
            $('<div>').addClass('input-grouped other-group')
                .append(this.$egg.render())
                .append(this.$shiny.render())
                .append(this.$pokerus1.render())
                .append(this.$pokerus2.render())
        );

    /**
     * DOM for Met
     */

    this.$location = Field({
        label: 'Location',
        type: 'select',
        options: location_options,
        selected: this.location
    });

    this.$ball = Field({
        label: 'Ball',
        type: 'select',
        options: ball_options,
        selected: this.ball
    });

    this.$met_date = Field({
        label: 'Date',
        type: 'date',
        value: this.met_date
    });

    this.$met_level = Field({
        label: 'Level',
        type: 'number',
        value: this.met_level,
        min: 1,
        max: 100
    });

    this.$encounter = Field({
        label: 'Encounter Type',
        type: 'select',
        selected: this.encounter,
        options: encounter_options
    });

    this.$fateful_encounter = Field({
        label: 'Fateful Encounter',
        type: 'check',
        checked: this.fateful_encounter,
    });

    this.$met_egg = Field({
        label: 'As Egg',
        type: 'check',
        checked: this.met_egg,
        disabled: this.egg
    }).change(function(v){
        if(v){
            that.$egg.disable();
            that.$egg_location.enable();
            that.$egg_date.enable();
        }
        else{
            that.$egg.enable();
            that.$egg_location.disable();
            that.$egg_date.disable();
        }
    });

    this.$egg_location = Field({
        label: 'Hatch Location',
        type: 'select',
        options: location_options,
        value: this.egg_location,
        disabled: this.egg || !this.met_egg
    });

    this.$egg_date = Field({
        label: 'Hatch Date',
        type: 'date',
        value: this.egg_date,
        disabled: this.egg || !this.met_egg
    });

    var $met_fields = $('<aside>').addClass('fields met')
                        .append(this.$location.render())
                        .append(this.$ball.render())
                        .append(this.$met_level.render())
                        .append(this.$met_date.render())
                        .append(this.$encounter.render())
                        .append(this.$fateful_encounter.render())
                        .append(this.$met_egg.render())
                        .append(this.$egg_location.render())
                        .append(this.$egg_date.render());

    /**
     * Stat DOM Elements
     */

    function adjust_ev(v){
        var values = [
            that.$hp_ev.val(),
            that.$att_ev.val(),
            that.$def_ev.val(),
            that.$special_att_ev.val(),
            that.$special_def_ev.val(),
            that.$spd_ev.val()
        ];

        var total = values.reduce(function(a, b){
            return parseInt(a) + parseInt(b);
        });

        if(total <= 510) return;

        var prev = total - v;
        var allowed = 510 - prev;

        this.val(allowed);
    }

    this.$hp_iv = Field({
        label: 'HP',
        type: 'number',
        min: 0,
        max: 31,
        value: this.iv.hp
    });

    this.$att_iv = Field({
        label: 'Attack',
        type: 'number',
        min: 0,
        max: 31,
        value: this.iv.att
    });

    this.$def_iv = Field({
        label: 'Defense',
        type: 'number',
        min: 0,
        max: 31,
        value: this.iv.def
    });

    this.$special_att_iv = Field({
        label: 'Sp.Atk',
        type: 'number',
        min: 0,
        max: 31,
        value: this.iv.special_att
    });

    this.$special_def_iv = Field({
        label: 'Sp.Def',
        type: 'number',
        min: 0,
        max: 31,
        value: this.iv.special_def
    });

    this.$spd_iv = Field({
        label: 'Speed',
        type: 'number',
        min: 0,
        max: 31,
        value: this.iv.spd
    });

    this.$hp_ev = Field({
        label: 'HP',
        type: 'number',
        min: 0,
        max: 252,
        value: this.ev.hp
    }).change(adjust_ev);

    this.$att_ev = Field({
        label: 'Attack',
        type: 'number',
        min: 0,
        max: 252,
        value: this.ev.att
    }).change(adjust_ev);

    this.$def_ev = Field({
        label: 'Defense',
        type: 'number',
        min: 0,
        max: 252,
        value: this.ev.def
    }).change(adjust_ev);

    this.$special_att_ev = Field({
        label: 'Sp.Atk',
        type: 'number',
        min: 0,
        max: 252,
        value: this.ev.special_att
    }).change(adjust_ev);

    this.$special_def_ev = Field({
        label: 'Sp.Def',
        type: 'number',
        min: 0,
        max: 252,
        value: this.ev.special_def
    }).change(adjust_ev);

    this.$spd_ev = Field({
        label: 'Speed',
        type: 'number',
        min: 0,
        max: 252,
        value: this.ev.spd
    }).change(adjust_ev);

    var $stat_fields = $('<aside>').addClass('fields stats')
                        .append(
                            $('<header>').append(
                                $('<h3>').text('Individual Values')
                            )
                        )
                        .append(this.$hp_iv.render())
                        .append(this.$att_iv.render())
                        .append(this.$def_iv.render())
                        .append(this.$special_att_iv.render())
                        .append(this.$special_def_iv.render())
                        .append(this.$spd_iv.render())
                        .append(
                            $('<header>').append(
                                $('<h3>').text('Effort Values')
                            )
                        )
                        .append(this.$hp_ev.render())
                        .append(this.$att_ev.render())
                        .append(this.$def_ev.render())
                        .append(this.$special_att_ev.render())
                        .append(this.$special_def_ev.render())
                        .append(this.$spd_ev.render());

    /**
     * Move DOM Elements
     */

    this.$move1 = Field({
        label: 'Move 1',
        type: 'select',
        selected: this.move1,
        options: move_options
    });

    this.$move2 = Field({
        label: 'Move 2',
        type: 'select',
        selected: this.move2,
        options: move_options
    });

    this.$move3 = Field({
        label: 'Move 3',
        type: 'select',
        selected: this.move3,
        options: move_options
    });

    this.$move4 = Field({
        label: 'Move 4',
        type: 'select',
        selected: this.move4,
        options: move_options
    });

    this.$ppup1 = Field({
        label: 'PP Up',
        type: 'number',
        min: 0,
        max: 3,
        value: this.ppup1
    });

    this.$ppup2 = Field({
        label: 'PP Up',
        type: 'number',
        min: 0,
        max: 3,
        value: this.ppup2
    });

    this.$ppup3 = Field({
        label: 'PP Up',
        type: 'number',
        min: 0,
        max: 3,
        value: this.ppup3
    });

    this.$ppup4 = Field({
        label: 'PP Up',
        type: 'number',
        min: 0,
        max: 3,
        value: this.ppup4
    });

    var $move_fields = $('<aside>').addClass('fields moves')
                        .append(
                            $('<div>').addClass('input-grouped')
                                .append(this.$move1.render())
                                .append(this.$ppup1.render())
                        )
                        .append(
                            $('<div>').addClass('input-grouped')
                                .append(this.$move2.render())
                                .append(this.$ppup2.render())
                        )
                        .append(
                            $('<div>').addClass('input-grouped')
                                .append(this.$move3.render())
                                .append(this.$ppup3.render())
                        )
                        .append(
                            $('<div>').addClass('input-grouped')
                                .append(this.$move4.render())
                                .append(this.$ppup4.render())
                        );

    /**
     * Misc DOM Elements
     */

    this.$trainer_gender = Field({
        label: 'Trainer Gender',
        type: 'select',
        options: [
            [Pokemon.MALE, 'Male'],
            [Pokemon.FEMALE, 'Female']
        ],
        selected: this.trainer_gender
    });

    this.$trainer_id_pub = Field({
        label: 'Public Trainer ID',
        type: 'number',
        min: 0,
        max: 65535,
        value: this.trainer_id_pub
    });

    this.$trainer_id_secret = Field({
        label: 'Secret Trainer ID',
        type: 'number',
        min: 0,
        max: 65535,
        value: this.trainer_id_secret
    });

    var $misc_fields = $('<aside>').addClass('fields moves')
                        .append(this.$trainer_gender.render())
                        .append(
                            $('<div>').addClass('input-grouped')
                                .append(this.$trainer_id_pub.render())
                                .append(this.$trainer_id_secret.render())
                        );

    /**
     * General Editor
     */

    this.$editor = $('<section>').addClass('editor').append(
        $('<nav>').append(
            $('<span>').addClass('main-button selected').text('Main')
                .click(function(){
                    that.$editor.find('.fields').hide();
                    $main_fields.show();

                    that.$editor.find('nav span').removeClass('selected');
                    $(this).addClass('selected');
                })
        ).append(
            $('<span>').addClass('met-button').text('Met')
                .click(function(){
                    that.$editor.find('.fields').hide();
                    $met_fields.show();

                    that.$editor.find('nav span').removeClass('selected');
                    $(this).addClass('selected');
                })
        ).append(
            $('<span>').addClass('stats-button').text('Stats')
                .click(function(){
                    that.$editor.find('.fields').hide();
                    $stat_fields.show();

                    that.$editor.find('nav span').removeClass('selected');
                    $(this).addClass('selected');
                })
        ).append(
            $('<span>').addClass('moves-button').text('Moves')
                .click(function(){
                    that.$editor.find('.fields').hide();
                    $move_fields.show();

                    that.$editor.find('nav span').removeClass('selected');
                    $(this).addClass('selected');
                })
        ).append(
            $('<span>').addClass('misc-button').text('Misc')
                .click(function(){
                    that.$editor.find('.fields').hide();
                    $misc_fields.show();

                    that.$editor.find('nav span').removeClass('selected');
                    $(this).addClass('selected');
                })
        ).append(
            $('<span>').addClass('choose-again-button').text('Start Over').click(eevee.reset)
        ).append(
            $('<span>').addClass('save-button').text('Save').click(function(){
                that.apply();
                eevee.save(that);
            })
        )
    ).append(
        $('<aside>').addClass('row').append(
            $('<figure>').append(this.$thumbnail).append(this.$typing)
        )
        .append($main_fields)
        .append($met_fields)
        .append($stat_fields)
        .append($move_fields)
        .append($misc_fields)
    );

    return this.$editor;
};
