var GROWTH_MAP = [
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    4, 
    4, 
    4, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    3, 
    3, 
    2, 
    2, 
    3, 
    3, 
    2, 
    2, 
    4, 
    4, 
    4, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    1, 
    1, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    1, 
    1, 
    4, 
    4, 
    4, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    1, 
    1, 
    4, 
    4, 
    4, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    1, 
    1, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    1, 
    1, 
    3, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    1, 
    1, 
    2, 
    2, 
    2, 
    2, 
    2, 
    1, 
    1, 
    1, 
    1, 
    1, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    2, 
    2, 
    2, 
    2, 
    3, 
    3, 
    3, 
    3, 
    2, 
    1, 
    1, 
    2, 
    3, 
    3, 
    3, 
    3, 
    2, 
    2, 
    4, 
    4, 
    4, 
    4, 
    3, 
    3, 
    2, 
    4, 
    4, 
    4, 
    4, 
    3, 
    4, 
    4, 
    2, 
    2, 
    2, 
    2, 
    2, 
    4, 
    2, 
    3, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    4, 
    2, 
    3, 
    3, 
    2, 
    2, 
    4, 
    1, 
    4, 
    2, 
    2, 
    2, 
    2, 
    1, 
    1, 
    3, 
    2, 
    2, 
    3, 
    1, 
    1, 
    1, 
    1, 
    2, 
    2, 
    2, 
    2, 
    1, 
    3, 
    2, 
    2, 
    2, 
    2, 
    2, 
    1, 
    3, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    2, 
    2, 
    1, 
    1, 
    1, 
    2, 
    2, 
    6, 
    6, 
    1, 
    1, 
    1, 
    5, 
    5, 
    5, 
    4, 
    4, 
    4, 
    6, 
    6, 
    3, 
    2, 
    3, 
    3, 
    4, 
    3, 
    1, 
    1, 
    1, 
    2, 
    2, 
    1, 
    1, 
    2, 
    2, 
    5, 
    6, 
    4, 
    6, 
    6, 
    1, 
    1, 
    6, 
    6, 
    2, 
    2, 
    2, 
    3, 
    3, 
    3, 
    4, 
    4, 
    4, 
    4, 
    4, 
    5, 
    5, 
    5, 
    6, 
    3, 
    3, 
    2, 
    2, 
    6, 
    6, 
    2, 
    2, 
    5, 
    5, 
    5, 
    5, 
    5, 
    5, 
    2, 
    4, 
    3, 
    3, 
    3, 
    3, 
    1, 
    3, 
    4, 
    2, 
    2, 
    2, 
    4, 
    4, 
    4, 
    5, 
    5, 
    5, 
    1, 
    3, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    2, 
    2, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    4, 
    5, 
    5, 
    5, 
    5, 
    2, 
    2, 
    2, 
    4, 
    4, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    3, 
    6, 
    6, 
    2, 
    2, 
    3, 
    4, 
    3, 
    3, 
    3, 
    2, 
    2, 
    2, 
    2, 
    2, 
    2, 
    3, 
    4, 
    2, 
    1, 
    1, 
    1, 
    1, 
    4, 
    4, 
    1, 
    1, 
    1, 
    1, 
    2, 
    2, 
    1, 
    5, 
    5, 
    1, 
    1, 
    1, 
    4, 
    2, 
    2, 
    1, 
    2, 
    2, 
    2, 
    3, 
    2, 
    2, 
    2, 
    4, 
    1, 
    2, 
    1, 
    2, 
    3, 
    2, 
    2, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    4, 
    1
];