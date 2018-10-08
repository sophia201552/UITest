var BaseSrc = require('../../baseScr.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class createObixDevice extends BaseSrc {
    constructor(driver) {
        super(driver);
        //  ----------  创建obix设备  ----------  //
        // 点击新建设备。
        driver.findElement(By.id("new-equipment")).click();
        driver.sleep(1000);
        // 在弹窗的创建终端窗口中填入数据
        driver.findElement(By.id("createDeviceForObixForm")).findElement(By.name("url")).sendKeys('203.45.2.28:88');
        driver.findElement(By.id("createDeviceForObixForm")).findElement(By.name("userName")).sendKeys('church');
        driver.findElement(By.id("createDeviceForObixForm")).findElement(By.name("pwd")).sendKeys('church');
        driver.findElement(By.id("createDeviceForObixForm")).findElement(By.name("equipName")).sendKeys('owen_test');
        driver.findElement(By.id("createDeviceForObixForm")).findElement(By.name("dtuPrefix")).sendKeys('owen' + new Date().getTime());
        driver.sleep(2000);
        // 提交数据创建obix节点
        driver.findElement(By.id("addDtuNode")).click();
    }
}
module.exports = createObixDevice;