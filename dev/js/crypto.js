/*
A JavaScript port of some
pkmcrypto functions (https://github.com/ceol/pkmcrypto/blob/master/crypto.py)
 */

var crypto = {
    checksum: function(data){
        checksum = 0;

        for(var n = 0; n < data.length; n += 2){
            checksum += swap_endian(buff_to_num([data[n], data[n + 1]]));
        }

        checksum &= 0xFFFF;

        return checksum;
    }
};
