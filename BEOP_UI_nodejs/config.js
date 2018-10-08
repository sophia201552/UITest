module.exports = {
    'DRIVER': {
        'BROWSER': 'chrome'
    },
    'URL': {
        'BEOP': 'http://beop.rnbtech.com.hk',
        //'BEOP': 'http://localhost'
    },
    'MONOGO': {
        'host': '120.55.113.116:27018',
        'user': 'beopweb',
        'password': 'RNB.beop-2013',
        'database': 'beopdata',
    },
    'MYSQL': {
        'host': 'localhost',
        'user': 'root',
        'password': '123456',
        'database': 'avalon',
    },
    'DELAY_TIME': {
        'super_long': 600000,
        'super': 180000,
        'long': 30000,
        'medium': 15000,
        'short': 5000,
        'mini': 3000,
        'supermini': 1000
    },
    'runType': 'online', // online, develop
    'case_online': [
        // -----------------------------------------   数据终端   -----------------------------------------
        //'../case_ui/terminal/case_17_08_17_101.js', // 数据终端删除设备一般流程
        '../case_ui/terminal/case_17_08_16_111.js', // 数据终端modbus创建一般流程
        '../case_ui/terminal/case_17_08_17_112.js'  // modbus创建并从已有点的dtu中复制数据一般流程
    ],
    'case_develop': [
        // -----------------------------------------   数据终端   -----------------------------------------
        '../case_ui/terminal/case_17_08_16_121.js' // 数据终端obix创建一般流程
    ]
}