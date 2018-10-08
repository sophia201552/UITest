var filePathPrefix = '../../';
var BaseSrc = require(filePathPrefix + 'modal/baseScr.js');
var CasePool = require(filePathPrefix + 'modal/casePool.js');
var CaseUI = require(filePathPrefix + 'modal/caseModal.js');
var CONFIG = require(filePathPrefix + 'config');
var LoginScr = require(filePathPrefix + 'modal/beop/loginScr.js');
var enterTerminal = require(filePathPrefix + 'modal/terminal/enterTerminal.js');
var createObixDevice = require(filePathPrefix + 'modal/terminal/obix/createObixDevice.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


// 数据终端obix创建一般流程

CasePool['case_17_08_16_121'] = new CaseUI('数据终端bobix创建一般流程', function (driver) {
    var _this = this;
    this.check('查看左侧tree是否增加了新的obix设备,比之前多了一个设备');
    this.step('1、登录,进入首页,选择一个项目 (项目名: modbustest0717 ; 项目id: 634)');
    // 用户登录。 
    driver.get(CONFIG.URL.BEOP);
    new LoginScr(driver, 'owen.ou@rnbtech.com.hk', 'aaaaaa');
    // 进入数据终端界面
    this.step('2、点击右上角菜单, 选择数据终端');
    new enterTerminal(driver);
    // 创建obix设备
    this.step('3、进入数据终端页面, 点击添加设备按钮, 弹出创建终端窗口,驱动类型为obix,输入必填信息 (IP 或域名,用户名,密码,设备名,点名前缀)并按确定按钮');
    driver.wait(until.elementLocated(By.css('#mb_dtu_list_ul_1_ul')), CONFIG.DELAY_TIME.long, '#mb_dtu_list_ul_1_ul 找不到');
    new createObixDevice(driver);
    driver.wait(until.elementLocated(By.css('#obixTable')), CONFIG.DELAY_TIME.super_long, '#obixTable 找不到');
    driver.findElements(By.css("#obixTable")).then(function (items) {
        //断言开始
        _this.assert.assertTrue(items.length > 0, '创建obix失败');  
        //断言结束
    });
    // 关闭浏览器
    driver.quit();
});