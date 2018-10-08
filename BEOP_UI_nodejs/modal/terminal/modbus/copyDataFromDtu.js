var CONFIG = require('../../../config');
var BaseSrc = require('../../baseScr.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class copyDataFromDtu extends BaseSrc {
    constructor(driver) {
        super(driver);
        var _this = this;
        //  ----------  从已有点的dtu中复制数据  ----------  //
        driver.wait(until.elementLocated(By.css('#copy-already')), CONFIG.DELAY_TIME.long, '#copy-already 找不到');
        driver.findElement(By.id("copy-already")).click();
        driver.sleep(driver.sleep(CONFIG.DELAY_TIME.supermini));
        driver.executeScript(function () {
            document.getElementById("copyFromOtherTpl").querySelector('.dtu-name').click();   
        });
        driver.findElement(By.id("copyFromOther")).click();
        driver.sleep(driver.sleep(CONFIG.DELAY_TIME.supermini));
        driver.findElement(By.className("infoBoxAlert")).findElement(By.className("alert-button")).click();
    }
}
module.exports = copyDataFromDtu;