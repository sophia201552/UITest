var convertDataMap = {
    convertFunctionCode: function (str) {
        var num;
        switch (str) {
            case '01 Read Coils (0x)':
                {
                    num = 1;
                    break;
                }
            case '02 Read Discrete Inputs(1x)':
                {
                    num = 2;
                    break;
                }
            case '03 Read Holding Registers(4x)':
                {
                    num = 3;
                    break;
                }
            case '04 Read Input Registers(3x)':
                {
                    num = 4;
                    break;
                }
            case '05 Write Single Coil':
                {
                    num = 5;
                    break;
                }
            case '06 Write Single Register':
                {
                    num = 6;
                    break;
                }
            case '15 Write Multiple Coils':
                {
                    num = 15;
                    break;
                }
            case '16 Write Multiple Registers':
                {
                    num = 16;
                    break;
                }
        }
        return num;
    },
    convertDataType: function (str) {
        var num;
        switch (str) {
            case 'Signed':
                {
                    num = 0;
                    break;
                }
            case 'UnSigned':
                {
                    num = 1;
                    break;
                }
            case 'Bite':
                {
                    num = 2;
                    break;
                }
            case 'Long':
                {
                    num = 3;
                    break;
                }
            case 'Long Inverse':
                {
                    num = 4;
                    break;
                }
            case 'Float':
                {
                    num = 5;
                    break;
                }
            case 'Float Inverse':
                {

                    num = 6;
                    break;
                }
            case 'Double':
                {
                    num = 7;
                    break;
                }
            case 'Double Inverse':
                {
                    num = 8;
                    break;
                }
            case 'String':
                {
                    num = 9;
                    break;
                }
            case 'String Inverse':
                {
                    num = 10;
                    break;
                }
        }
        return num;
    }
}

module.exports = convertDataMap;