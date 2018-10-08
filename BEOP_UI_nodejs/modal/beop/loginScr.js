var BaseSrc = require('../baseScr.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class LoginScr extends BaseSrc {
    constructor(driver, account, pwd) {
        super(driver);
        driver.findElement(By.id('txtName')).sendKeys(account);
        driver.findElement(By.id('txtPwd')).sendKeys(pwd);
        driver.findElement(By.id('btnLogin')).click();
    }
}
module.exports = LoginScr;