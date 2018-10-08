var CasePool = require('../modal/casePool.js');
var CaseUI = require('../modal/caseModal.js');
var CONFIG = require('../config');
var LoginScr = require('../modal/beop/loginScr.js');
var workOrder = require('../modal/beop/workOrder.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


// 趋势图一般流程

CasePool['Case_0001'] = new CaseUI('趋势图一般流程', function(driver) {

    this.check('111');

    this.step('1、 打开beop。 显示BeOP网站。');
    driver.get(CONFIG.URL.BEOP);
    // 2、 输入用户名密码, 单击登录。 进入项目选择页面。
    new LoginScr(driver).login('will.wu@rnbtech.com.hk', 'Wq876215');
    // 3、 单击右上角用户头像。 弹出用户菜单。
    // driver.wait(until.elementLocated(By.id('iconList')),5000);
    driver.sleep(3000);
    // this.assert.assertTrue(!!document.querySelector("#iconList--"),'node miss');
    try{
        driver.findElement(By.id("iconList")).click();  
    }catch(e){
        console.log(e);
    }
    // 4、 单击我的工单。 进入工单页面。
    driver.findElement(By.id("paneWorkflow")).click();
    // 5、 新建工单。
    new workOrder(driver).show();
    //6、 登出。 返回登录页。
    driver.findElement(By.id("iconList")).click();
    this.assert.assertTrue(false,"存在");
    driver.findElement(By.id("btnDropdownNavList")).findElements(By.css("li")).then(function selectBug(lis){
        lis[lis.length-2].click();
    });
});