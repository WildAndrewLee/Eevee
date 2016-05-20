function get_forms(id){
    for(var n = 0; n < FORMS.length; n++){
        var pokemon = FORMS[n];

        if(pokemon[0] === id){
            return pokemon[1];
        }
    }

    return null;
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
    this.valid_abilities = ABILITY_MAP[id];
    this.valid_natures = NATURE_MAP[id];
    this.valid_forms = get_forms(this.id);

    this.level = 1;
    this.exp = 0;
    this.held_item = 0;
    this.happiness = 0;
    this.form = this.valid_forms.length || null;

    this.language = 9; // Default to English.
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
}
