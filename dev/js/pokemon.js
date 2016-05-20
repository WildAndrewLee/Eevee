function get_forms(id){
    for(var n = 0; n < FORMS.length; n++){
        var pokemon = FORMS[n];

        if(pokemon[0] === id){
            var forms = [];

            Object.getOwnPropertyNames(pokemon[1]).forEach(function(ele){
                forms.push([pokemon[1][ele], ele]);
            });

            return forms;
        }
    }

    return null;
}

function get_abilities(id){
    var abilities = ABILITY_MAP[id];
    var to_return = [];

    abilities.forEach(function(ele, i){
        to_return.push([ele[0], ABILITIES[ele[0] - 1]]);
    });

    return to_return;
}

function get_ability_slot(id, ability){
    var abilities = ABILITY_MAP[id];

    for(var n = 0; n < abilities.length; n++){
        if(abilities[n][0] === ability){
            return abilities[n][1];
        }
    }

    return null;
}

function get_max_exp(id){
    var exp_curve = EXP_MAP[GROWTH_MAP[id] - 1];
    return exp_curve[exp_curve.length - 1];
}

function get_exp_for_level(id, lvl){
    var exp_curve = EXP_MAP[GROWTH_MAP[id] - 1];
    return exp_curve[lvl - 1];
}

function get_level_from_exp(id, exp){
    var exp_curve = EXP_MAP[GROWTH_MAP[id] - 1];

    for(var n = 0; n < exp_curve.length; n++){
        if(exp_curve[n] > exp){
            return n;
        }
    }

    return 100;
}

function is_genderless(id){
    return GENDER_MAP[id] === -1;
}

function is_only_female(id){
    // Gender map is an array of
    // chances for a pokemon to be
    // female. A rate of 8 means
    // a pokemon is only female.
    return GENDER_MAP[id] === 8;
}

function get_natures_as_options(){
    var to_return = [];

    NATURES.forEach(function(ele, i){
        to_return.push([i, ele])
    });

    return to_return;
}

var NATURE_OPTIONS = get_natures_as_options();

NATURE_OPTIONS.sort(function(a, b){
    return a[1].localeCompare(b[1]);
});

function Pokemon(id){
    this.id = id;

    // Zero index the ID.
    id--;

    /**
     * Basic Info
     */

    this.name = POKEMON[id];
    this.nickname = null;

    this.valid_moves = MOVE_MAP[id];
    this.valid_abilities = get_abilities(id);
    this.valid_forms = get_forms(this.id);

    this.ability = this.valid_abilities[0][0];

    this.level = 1;
    this.exp = 0;
    this.held_item = 0;
    this.happiness = 0;
    this.form = this.valid_forms ? 0 : null;

    this.language = 2; // Default to English.
    this.origin = 7; // Default to HG.

    this.gender = is_genderless(id) ? GENDERLESS : is_only_female(id) ? FEMALE : MALE;

    this.egg = false;
    this.shiny = false;
    this.pokerus1 = 0;
    this.pokerus2 = 0;

    /**
     * Met Info
     */

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

    /**
     * DOM Elements
     */

    var that = this;

    this.$name = Field({
        label: 'Pokémon Name',
        value: this.name,
        disabled: true
    });

    this.$nickname = Field({
        label: 'Nickname'
    }).change(function(v){
        that.nickname = v;
    });

    this.$nature = Field({
        label: 'Nature',
        type: 'select',
        options: NATURE_OPTIONS,
        selected: 1
    }).change(function(v){
        that.nature = v;
    });

    this.$ability = Field({
        label: 'Ability',
        type: 'select',
        options: this.valid_abilities,
        selected: this.ability
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
        that.level = v;
        that.exp = get_exp_for_level(id, v);
        that.$exp.val(that.exp);
    });

    this.$exp = Field({
        label: 'Experience',
        type: 'number',
        min: 0,
        max: get_max_exp(this.id),
        value: this.exp
    }).change(function(v){
        that.exp = v;
        that.level = get_level_from_exp(id, v);
        that.$level.val(that.level);
    });

    this.$held = Field({
        label: 'Held Item',
        type: 'select',
        options: ITEMS,
        selected: this.held_item
    }).change(function(v){
        that.held_item = v;
    });

    this.$happiness = Field({
        label: 'Happiness',
        type: 'number',
        min: 0,
        max: 255,
        value: this.happiness,
    }).change(function(v){
        that.happiness = v;
    });

    this.$form = Field({
        label: 'Form',
        type: 'select',
        disabled: !this.valid_forms,
        selected: this.form === null ? 0 : this.form,
        options: this.valid_forms || [[0, 'Not Available']]
    }).change(function(v){
        that.form = v;
    });

    this.$lang = Field({
        label: 'Language',
        type: 'select',
        selected: this.language,
        options: LANGUAGE
    }).change(function(v){
        that.language = v;
    });

    this.$origin = Field({
        label: 'Origin',
        type: 'select',
        selected: this.origin,
        options: ORIGIN
    }).change(function(v){
        that.origin = v;
    });

    this.$gender = Field({
        label: 'Gender',
        type: 'select',
        selected: this.gender,
        options: is_genderless(id) ? [[GENDERLESS, 'Genderless']] : [
            [MALE, 'Male'],
            [FEMALE, 'Female']
        ],
        disabled: is_genderless(id)
    }).change(function(v){
        that.gender = v;
    });

    this.$egg = Field({
        label: 'Egg',
        type: 'check',
        checked: this.egg
    }).change(function(v){
        that.egg = v;
    });

    this.$shiny = Field({
        label: 'Shiny',
        type: 'check',
        checked: this.shiny
    }).change(function(v){
        that.shiny = v;
    });

    this.$pokerus1 = Field({
        label: 'Pokérus Strain',
        type: 'number',
        min: 0,
        max: 4,
        value: this.pokerus1
    }).change(function(v){
        that.pokerus1 = v;
    });

    this.$pokerus2 = Field({
        label: 'Pokérus Duration',
        type: 'number',
        min: 0,
        max: 4,
        value: this.pokerus2
    }).change(function(v){
        that.pokerus2 = v;
    });

    $('#test').append(this.$name.render());
    $('#test').append(this.$nickname.render());
    $('#test').append(this.$nature.render());
    $('#test').append(this.$ability.render());

    $('#test').append(
        $('<div>').addClass('input-grouped')
            .append(this.$level.render())
            .append(this.$exp.render())
    );

    $('#test').append(this.$held.render());
    $('#test').append(this.$happiness.render());
    $('#test').append(this.$form.render());
    $('#test').append(this.$lang.render());
    $('#test').append(this.$origin.render());
    $('#test').append(this.$gender.render());

    $('#test').append(
        $('<div>').addClass('input-grouped other-group')
            .append(this.$egg.render())
            .append(this.$shiny.render())
            .append(this.$pokerus1.render())
            .append(this.$pokerus2.render())
    );
}

Pokemon.prototype.render = function(){

};
