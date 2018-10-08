var filePathPrefix = '../../';
var BaseSrc = require(filePathPrefix + 'modal/baseScr.js');
var CasePool = require(filePathPrefix + 'modal/casePool.js');
var CaseUI = require(filePathPrefix + 'modal/caseModal.js');
var CONFIG = require(filePathPrefix + 'config');
var LoginScr = require(filePathPrefix + 'modal/beop/loginScr.js');
var enterTerminal = require(filePathPrefix + 'modal/terminal/enterTerminal.js');
var createModbusDevice = require(filePathPrefix + 'modal/terminal/modbus/createModbusDevice.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
    

// 数据终端modbus创建一般流程

CasePool['case_17_08_16_111'] = new CaseUI('数据终端modbus创建一般流程', function(driver) {
    var _this = this;
    this.check('查看左侧tree是否增加了新的modbus设备,比之前多了一个设备');
    this.step('1、登录,进入首页,选择一个项目 (项目名: modb ustest0717 ; 项目id: 634)');

    // 用户登录。 
    driver.get(CONFIG.URL.BEOP);
    new LoginScr(driver, 'owen.ou@rnbtech.com.hk', 'aaaaaa');

    // 进入数据终端界面
    this.step('2、点击右上角菜单, 选择数据终端');
    new enterTerminal(driver);
     
    // 创建modbus设备 test3
    this.step('3、进入数据终端页面, 点击添加设备按钮, 弹出创建终端窗口,切换驱动类型为modbus,输入必填信息 (驱动类型,设备名, 点名前缀)并提交');
    driver.wait(until.elementLocated(By.css('#mb_dtu_list_ul_1_ul .modbus')), CONFIG.DELAY_TIME.long, '#mb_dtu_list_ul_1_ul .modbus 找不到');
    let pastDtuLength = 0;
    let nowDtuLength = 0;
    let modbusUl = driver.findElement(By.css("#mb_dtu_list_ul_1_ul"));
    modbusUl.findElements(By.className("modbus")).then(function (lis) {
        pastDtuLength = lis.length;
    });

    new createModbusDevice(driver);
    // 强制sleep, 创建后再刷新左侧tree可能需要一定时间, 不等待新数据未加载进来, 判断个数不对, assert会报错 
    driver.sleep(CONFIG.DELAY_TIME.short);
    modbusUl.findElements(By.className("modbus")).then(function (li) {
        nowDtuLength = li.length;   
        //断言开始
        _this.assert.assertEqual(pastDtuLength + 1, nowDtuLength, '创建modbus失败,设备新增出错');  
        //断言结束
    }) ;
    // 关闭浏览器
    driver.quit();
});