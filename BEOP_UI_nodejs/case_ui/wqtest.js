var BaseSrc = require('../modal/baseScr.js');
var CasePool = require('../modal/casePool.js');
var CaseUI = require('../modal/caseModal.js');
var CONFIG = require('../config');
var LoginScr = require('../modal/beop/loginScr.js');
var tendencyChart = require('../modal/beop/tendencyChart.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


// 趋势图一般流程

CasePool['wqtest'] = new CaseUI('工单一般流程', function (driver) {
    let baseScr = new BaseSrc();
    console.log(webdriver);

    this.check('111');
    this.step('1、 打开beop。 显示BeOP网站。');
    driver.get(CONFIG.URL.BEOP);


    //  ------------------------------------------------------ test ------------------------------------------------------
    let data1 = {
        "modbus_point_list": [
            { "name": "point1", "note": "", "pointId": "59c4b0ac8a78ea1a04db7963" },
            { "name": "point2", "note": "", "pointId": "59c4b0ac8a78ea1a04db7964" },
            { "name": "point3", "note": "", "pointId": "59c4b0ac8a78ea1a04db7965" }
        ]
    };
    let data2 = {
        "modbus_point_list": [
            { "name": "point1", "note": "", "pointId": "59c4b0ac8a78ea1a04db7963" },
            { "name": "point2", "note": "", "pointId": "59c4b0ac8a78ea1a04db7964" },
            { "name": "point3", "note": "", "pointId": "59c4b0ac8a78ea1a04db7965" }
        ]
    };
    let arr1 = [
            { "multiple": 1.0, "name": "point1", "note": "", "pointId": "59c4b0ac8a78ea1a04db7963"},
            { "multiple": 1.0, "name": "point2", "note": "", "pointId": "59c4b0ac8a78ea1a04db7964"},
            { "multiple": 1.0, "name": "point3", "note": "", "pointId": "59c4b0ac8a78ea1a04db7965"}
        ];
    let arr2 = [
            { "multiple": 1.0, "name": "point1", "note": "", "pointId": "59c4b0ac8a78ea1a04db7963"},
            { "multiple": 1.0, "name": "point2", "note": "", "pointId": "59c4b0ac8a78ea1a04db7964"},
            { "multiple": 1.0, "name": "point3", "note": "", "pointId": "59c4b0ac8a78ea1a04db7965"}
        ];
    this.assert.assertEqual(arr1, arr2, '数组不相等');
    this.assert.assertEqual(data1, data2, '对象不相等');
    //  ------------------------------------------------------ test ------------------------------------------------------

    // 2、 输入用户名密码, 单击登录。 进入项目选择页面。
    new LoginScr(driver).login('will.wu@rnbtech.com.hk', 'Wq876215');
    driver.sleep(3000);
    // 4、 单击右上角用户头像。 弹出用户菜单。
    driver.wait(until.elementLocated(By.id('iconList')), 5000);
    //断言开始
    baseScr.isExist(driver.findElement(By.id("iconList")), this.assert.assertTrue.bind(this.assert), "元素没找到");
    //断言结束
    driver.findElement(By.id("iconList")).click();
    // 5、 单击数据分析。 进入数据分析页面。
    driver.findElement(By.id("btnDataAnalys")).click();
    // 5、 新建一个趋势图的数据分析。
    new tendencyChart(driver, this.assert).show();
    // 6、 登出。 返回登录页。
    driver.findElement(By.id("iconList")).click();
    driver.findElement(By.id("btnDropdownNavList")).findElements(By.css("li")).then(function selectBug(lis) {
        lis[lis.length - 2].click();
    });
});

