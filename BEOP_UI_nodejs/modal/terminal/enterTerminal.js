var filePathPrefix = '../../';
var BaseSrc = require('../baseScr.js');
var CONFIG = require(filePathPrefix + 'config');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class enterTerminal extends BaseSrc {
    constructor(driver) {
        super(driver);
        // 将图片滚动条拉到最底部
        driver.wait(until.elementLocated(By.css('.project-media-container .media')), CONFIG.DELAY_TIME.long, '.project-media-container .media 找不到');
        driver.executeScript(function () {
            document.getElementsByClassName("projectsContainer")[0].scrollTop = 5000;
        });
        // 选择一个数据终端测试项目点击 ( 项目名:modbustest0717 ; project-id = 634 )
        driver.findElement(By.css("#project-media-control div[project-id='634']")).click();
        driver.wait(until.elementLocated(By.css('#iconList')), CONFIG.DELAY_TIME.mini, '#iconList 找不到');
        // 单击数据终端。 进入数据终端页面。
        driver.findElement(By.css("#iconList")).click();
        driver.wait(until.elementLocated(By.css('#modbus')), CONFIG.DELAY_TIME.mini, '找不到#modbus元素');
        driver.findElement(By.css("#modbus")).click();
    }
}
module.exports = enterTerminal;