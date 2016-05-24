/*
JavaScript implementation of the PRNG system.
Original Python Implementation: https://github.com/ceol/pkmcrypto/blob/master/crypto.py
 */

var RANDOMIZER = 0x41C64E6D;
var OFFSET = 0x6073;
var SEEDMASK = 0xFFFFFFFF;
var BANDWIDTH = 0x10;

function PRNG(seed){
    this.seed = seed;
}

PRNG.prototype.rand = function(){
    this.seed *= RANDOMIZER;
    this.seed &= SEEDMASK;
    this.seed += OFFSET;
    this.seed &= SEEDMASK;
    return this.seed >> BANDWIDTH;
};
