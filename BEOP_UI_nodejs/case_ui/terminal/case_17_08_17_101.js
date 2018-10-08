var filePathPrefix = '../../';
var BaseSrc = require(filePathPrefix + 'modal/baseScr.js');
var CasePool = require(filePathPrefix + 'modal/casePool.js');
var CaseUI = require(filePathPrefix + 'modal/caseModal.js');
var CONFIG = require(filePathPrefix + 'config');
var LoginScr = require(filePathPrefix + 'modal/beop/loginScr.js');
var enterTerminal = require(filePathPrefix + 'modal/terminal/enterTerminal.js');
var deleteDevice = require(filePathPrefix + 'modal/terminal/deleteDevice.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    promise = webdriver.promise;


// 数据终端删除设备一般流程

CasePool['case_17_08_17_101'] = new CaseUI('数据终端modbus创建一般流程', function (driver) {
    var _this = this;
    this.check('查看数据终端设备是否比之前少一个设备');
    this.step('1、登录,进入首页,选择一个项目 (项目名: modbustest0717 ; 项目id: 634)');

    // 用户登录。 
    driver.get(CONFIG.URL.BEOP);
    new LoginScr(driver, 'owen.ou@rnbtech.com.hk', 'aaaaaa');

    // 进入数据终端界面
    this.step('2、点击右上角菜单, 选择数据终端');
    new enterTerminal(driver);

    // 删除数据终端的最后一个设备
    this.step('3、选择最后一个设备,点击删除按钮,弹窗删除确认窗口,确定删除');
    driver.wait(until.elementLocated(By.css('#mb_dtu_list_ul_1')), CONFIG.DELAY_TIME.long, '#mb_dtu_list_ul_1 找不到');
    // 将图片滚动条拉到最底部
    let pastDtuLength = 0;
    let nowDtuLength = 0;

    let modbusUl = driver.findElement(By.css("#mb_dtu_list_ul_1_ul"));
    modbusUl.findElements(By.className("modbus")).then(function (lis) {
        pastDtuLength = lis.length;
    });
    driver.executeScript(function () {
        var ul = document.getElementById("mb_dtu_list_ul"),
            li = ul.querySelectorAll('a.level1'),
            liLength = li.length;
        ul.scrollTop = 1000;
        li[liLength - 1].click();

    });
    // 有的时候可能需要强制sleep, 点击时, 删除按钮还没有立即设置成可点击状态 eg. driver.sleep(1000);
    driver.sleep(driver.sleep(CONFIG.DELAY_TIME.supermini));
    driver.findElement(By.css("#dtuOpBtnGroup .removeNode")).click();
    driver.wait(until.elementLocated(By.css('.infoBoxConfirm')), CONFIG.DELAY_TIME.long, '.infoBoxConfirm 找不到');
    driver.findElement(By.css(".infoBoxConfirm .alert-button")).click();

    // 断言测试
    // 强制sleep, 删除再刷新可能需要一定时间, 页面不能立即删除
    driver.sleep(CONFIG.DELAY_TIME.short);
    modbusUl.findElements(By.className("modbus")).then(function (lis) {
        nowDtuLength = lis.length;
        //断言开始
        _this.assert.assertEqual(pastDtuLength - 1, nowDtuLength, '删除终端设备失败!');
        //断言结束
    });
});