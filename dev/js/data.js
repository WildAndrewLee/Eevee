var LANGUAGE = [
    [1, 'Japanese'],
    [2, 'English'],
    [3, 'French'],
    [4, 'Italian'],
    [5, 'German'],
    [6, 'Spanish'],
    [7, 'Korean']
];

var ORIGIN = [
    [1, 'Sapphire'],
    [2, 'Ruby']    ,
    [3, 'Emerald'],
    [4, 'FireRed'],
    [5, 'LeafGreen'],
    [7, 'HeartGold'],
    [8, 'SoulSilver'],
    [10, 'Diamond'],
    [11, 'Pearl'],
    [12, 'Platinum'],
    [15, 'Colosseum/XD']
];

/* Sort all data arrays */
NATURES.sort(function(a, b){
    return a[1].localeCompare(b[1]);
});

ABILITIES.sort(function(a, b){
    return a[1].localeCompare(b[1]);
});

ITEMS.sort(function(a, b){
    return a[1].localeCompare(b[1]);
});

ITEMS.unshift([0, 'None']);

var MALE = 0;
var FEMALE = 1;
var GENDERLESS = 2;