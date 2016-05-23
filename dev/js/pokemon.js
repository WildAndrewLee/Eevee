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
    this.nature = 1;

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

    /**
     * Moves
     */

    this.move1 = null;
    this.move2 = null;
    this.move3 = null;
    this.move4 = null;

    /**
     * Ribbons
     */

    /**
     * Misc
     */
}

Pokemon.MALE = 1;
Pokemon.FEMALE = 2;
Pokemon.GENDERLESS = 3;

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
}

Pokemon.prototype.only_female = function(){
    return !this.valid_gender.male && this.valid_gender.female;
}

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
        if(v){
            that.$met_egg.disable();
            that.$egg_location.disable();
            that.$egg_date.disable();
        }else{
            that.$met_egg.enable();
            that.$egg_location.enable();
            that.$egg_date.enable();
        }
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
        label: 'Encounter',
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
        if(v) that.$egg.disable();
        else that.$egg.enable();
    });

    this.$egg_location = Field({
        label: 'Hatch Location',
        type: 'select',
        options: location_options,
        value: this.egg_location,
        disabled: !this.egg && this.met_egg
    });

    this.$egg_date = Field({
        label: 'Hatch Date',
        type: 'date',
        value: this.egg_date,
        disabled: !this.egg && this.met_egg
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
     * General Editor
     */

    this.$editor = $('<section>').addClass('editor').append(
        $('<nav>').append(
            $('<span>').addClass('main-button selected').text('Main')
                .click(function(){
                    that.$editor.find('.fields').hide();
                    $('.fields.main').show();

                    that.$editor.find('nav span').removeClass('selected');
                    $(this).addClass('selected');
                })
        ).append(
            $('<span>').addClass('met-button').text('Met')
                .click(function(){
                    that.$editor.find('.fields').hide();
                    $('.met.fields').show();

                    that.$editor.find('nav span').removeClass('selected');
                    $(this).addClass('selected');
                })
        ).append(
            $('<span>').addClass('stats-button').text('Stats')
        ).append(
            $('<span>').addClass('moves-button').text('Moves')
        ).append(
            $('<span>').addClass('ribbons-button').text('Ribbons')
        ).append(
            $('<span>').addClass('misc-button').text('Misc')
        ).append(
            $('<span>').addClass('choose-again-button').text('Start Over').click(eevee.reset)
        ).append(
            $('<span>').addClass('save-button').text('Save')
        )
    ).append(
        $('<aside>').addClass('row').append(
            $('<figure>').append(this.$thumbnail).append(this.$typing)
        )
        .append($main_fields)
        .append($met_fields)
    );

    return this.$editor;
};
