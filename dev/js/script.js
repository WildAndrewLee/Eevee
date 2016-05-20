function Pokemon(id){
    this.id = id;

    // 0 index the ID.
    id--;

    this.name = POKEMON[id];
    this.valid_moves = MOVE_MAP[id];
    this.valid_abilities = ABILITY_MAP[id];

    this.level = 1;
    this.exp = 0;

    this.move1 = null;
    this.move2 = null;
    this.move3 = null;
    this.move4 = null;
}

$(function(){
    var dragonite = 149;

    var $name = Field({
        label: 'Pokémon Name',
        value: 'Dragonite'
    });

    var $nickname = Field({
        label: 'Nickname'
    });

    var $nature = Field({
        label: 'Nature',
        type: 'select',
        options: NATURES,
        selected: 4
    });

    var $ability = Field({
        label: 'Ability',
        type: 'select',
        options: ABILITIES,
        selected: 39
    });

    var $level = Field({
        label: 'Level',
        type: 'number',
        min: 1,
        max: 100,
        value: 100
    });

    var $exp = Field({
        label: 'Experience',
        type: 'number',
        min: 0,
        max: 1250000,
        value: 1250000
    });

    var $held = Field({
        label: 'Held Item',
        type: 'select',
        options: ITEMS,
        selected: 0
    });

    var $happiness = Field({
        label: 'Happiness',
        type: 'number',
        min: 0,
        max: 255,
        value: 255
    });

    var $form = Field({
        label: 'Form',
        type: 'select',
        disabled: true,
        selected: 0,
        options: [
            [0, 'Not Available']
        ]
    });

    var $lang = Field({
        label: 'Language',
        type: 'select',
        selected: 2,
        options: LANGUAGE
    });

    var $origin = Field({
        label: 'Origin',
        type: 'select',
        selected: 7,
        options: ORIGIN
    });

    var $gender = Field({
        label: 'Gender',
        type: 'select',
        selected: 0,
        options: [
            [MALE, 'Male'],
            [FEMALE, 'Female'],
            [GENDERLESS, 'Genderless']
        ]
    });

    var $egg = Field({
        label: 'Egg',
        type: 'check'
    });

    var $shiny = Field({
        label: 'Shiny',
        type: 'check'
    });

    var $pokerus1 = Field({
        label: 'Pokérus Strain',
        type: 'number',
        min: 0,
        max: 4
    });

    var $pokerus2 = Field({
        label: 'Pokérus Duration',
        type: 'number',
        min: 0,
        max: 4
    });

    $('#test').append($name.render());
    $('#test').append($nickname.render());
    $('#test').append($nature.render());
    $('#test').append($ability.render());

    $('#test').append(
        $('<div>').addClass('input-grouped')
            .append($level.render())
            .append($exp.render())
    );

    $('#test').append($held.render());
    $('#test').append($happiness.render());
    $('#test').append($form.render());
    $('#test').append($lang.render());
    $('#test').append($origin.render());
    $('#test').append($gender.render());

    $('#test').append(
        $('<div>').addClass('input-grouped other-group')
            .append($egg.render())
            .append($shiny.render())
            .append($pokerus1.render())
            .append($pokerus2.render())
    );
});
