var filePathPrefix = '../../';
var BaseSrc = require(filePathPrefix + 'modal/baseScr.js');
var CasePool = require(filePathPrefix + 'modal/casePool.js');
var CaseUI = require(filePathPrefix + 'modal/caseModal.js');
var CONFIG = require(filePathPrefix + 'config');
var terminalData = require(filePathPrefix + 'json_test/terminal_data.js');
var convertDataMap = require(filePathPrefix + 'convert_data/convert_data_terminal.js');
var LoginScr = require(filePathPrefix + 'modal/beop/loginScr.js');
var enterTerminal = require(filePathPrefix + 'modal/terminal/enterTerminal.js');
var createModbusDevice = require(filePathPrefix + 'modal/terminal/modbus/createModbusDevice.js');
var copyDataFromDtu = require(filePathPrefix + 'modal/terminal/modbus/copyDataFromDtu.js');
var fs = require('fs');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    map = webdriver.promise.map;


// modbus创建,并从已有点的dtu中复制数据一般流程
CasePool['case_17_08_17_112'] = new CaseUI('数据终端modbus创建一般流程', function (driver) {
    // try{ // 读取文件
    //     var data=fs.readFileSync('./json_test/terminal_data.js','UTF-8');
    //     console.log(data+"ͬ文件加载完成");
    // }catch(e){
    //     console.log(e)
    // }
    var _this = this;
    this.check('查看左侧tree是否增加了新的modbus设备');
    this.check('从第一个已有点表的modbus设备中复制点表,点表不为空,有数据');
    this.step('1、登录,进入首页,选择一个项目 (项目名: modbustest0717 ; 项目id: 634)');
    // 用户登录。 
    driver.get(CONFIG.URL.BEOP);
    new LoginScr(driver, 'owen.ou@rnbtech.com.hk', 'aaaaaa');

    // 进入数据终端界面
    this.step('2、点击右上角菜单, 选择数据终端');
    new enterTerminal(driver);

    // 创建modbus设备
    this.step('3、进入数据终端页面, 点击添加设备按钮, 弹出创建终端窗口,切换驱动类型为modbus,输入必填信息 (驱动类型,设备名, 点名前缀)并提交');
    driver.wait(until.elementLocated(By.css('#mb_dtu_list_ul_1_ul')), CONFIG.DELAY_TIME.long, '#mb_dtu_list_ul_1_ul 找不到');
    let pastDtuLength = 0;
    let nowDtuLength = 0;
    let modbusUl = driver.findElement(By.css("#mb_dtu_list_ul_1_ul"));
    modbusUl.findElements(By.className("modbus")).then(function (li) {
        pastDtuLength = li.length;
    });
    new createModbusDevice(driver);
    // 强制sleep, 创建后再刷新左侧tree可能需要一定时间, 不等待新数据未加载进来, 判断个数不对, assert会报错 
    driver.sleep(CONFIG.DELAY_TIME.short);
    driver.wait(until.elementLocated(By.css('#mb_dtu_list_ul_1_ul .modbus')), CONFIG.DELAY_TIME.long, '#mb_dtu_list_ul_1_ul .modbus 找不到');
    modbusUl.findElements(By.className("modbus")).then(function (li) {
        nowDtuLength = li.length;
        //断言开始
        _this.assert.assertEqual(pastDtuLength + 1, nowDtuLength, '创建modbus失败,设备新增出错');
        //断言结束
    });
    // 从已有点的dtu中复制数据
    this.step('4、点击从已有点表中复制,再弹出的列表中选第一个进行复制点表,点击确认按钮.');
    new copyDataFromDtu(driver);
    driver.wait(until.elementLocated(By.css('#mbTable .table-body tr td .ellipsis')), CONFIG.DELAY_TIME.long, '#mbTable .table-body tr td .ellipsis 找不到');
    var checkTds = driver.findElements(By.css("#mbTable .table-body tr td .ellipsis"));
    checkTds.then(function (tds) {
        map(tds, e => e.getText()).then(function (values) {
            var colsNum = 12;
            var rowsNum = values.length / 12;
            var checkList = [];
            for (var i = 0; i < rowsNum; i++) {
                var tdMap = {};
                // 0: 有长随机前缀
                // 1,2: 需要动态刷新
                // 11: 有国际化问题, 
                //tdMap.pointName = values[i * colsNum + 0];
                tdMap.pointType = values[i * colsNum + 3];
                tdMap.note = values[i * colsNum + 4];
                tdMap.slaveId = values[i * colsNum + 5];
                tdMap.address = values[i * colsNum + 6];
                tdMap.functionCode = convertDataMap.convertFunctionCode(values[i * colsNum + 7]);
                tdMap.multiple = values[i * colsNum + 8];
                tdMap.dataType = convertDataMap.convertDataType(values[i * colsNum + 9]);
                tdMap.dataLength = values[i * colsNum + 10];
                //tdMap.refreshCycle = values[i * colsNum + 11];
                checkList.push(tdMap);
            }
            //断言开始
            _this.assert.assertEqual(checkList, terminalData.modbus_point_list, '设备新增出错, 页面数据与复制数据不一致');
            //断言结束
        });
    });
    // 关闭浏览器
    driver.quit();
});