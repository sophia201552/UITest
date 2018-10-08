var filePathPrefix = '../../';
var BaseSrc = require('../baseScr.js');
var CONFIG = require(filePathPrefix + 'config');
var BaseSrc = require('../baseScr.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class deleteDevice extends BaseSrc {
    constructor(driver) {
        super(driver);
        driver.wait(until.elementLocated(By.css('#mb_dtu_list_ul_1')), CONFIG.DELAY_TIME.long, '#mb_dtu_list_ul_1 找不到');
        // 将图片滚动条拉到最底部 
        driver.executeScript(function () {
            var ul = document.getElementById("mb_dtu_list_ul"),
                li = ul.querySelectorAll('a.level1'),
                liLength = li.length;
            ul.scrollTop = 1000;
            li[liLength - 1].click();
        });
        // 有的时候可能需要强制sleep, 点击时, 删除按钮还没有设置成可点击状态 eg. driver.sleep(1000);
        driver.findElement(By.css("#dtuOpBtnGroup .removeNode")).click();
        driver.wait(until.elementLocated(By.css('.infoBoxConfirm')), CONFIG.DELAY_TIME.long, '.infoBoxConfirm 找不到');
        driver.findElement(By.css(".infoBoxConfirm .alert-button")).click();
    }
}
module.exports = deleteDevice;