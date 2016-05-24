/*
A JavaScript port of some
pkmcrypto functions (https://github.com/ceol/pkmcrypto/blob/master/crypto.py)
 */

var crypt = {
    checksum: function(data){
        var checksum = 0;
        var buff = new Uint16Array(data);

        for(var n = 0; n < buff.length; n++){
            checksum += buff[n];
        }

        checksum &= 0xFFFF;

        return checksum;
    }
};
