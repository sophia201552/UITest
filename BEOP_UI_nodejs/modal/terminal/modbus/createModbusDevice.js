var CONFIG = require('../../../config');
var BaseSrc = require('../../baseScr.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class createModbusDevice extends BaseSrc {
    constructor(driver) {
        super(driver);
        // 点击新建设备。
        driver.findElement(By.id("new-equipment")).click();
        driver.sleep(CONFIG.DELAY_TIME.supermini);
        // 在弹窗的创建终端窗口中选择modbus
        driver.findElement(By.id("selectDtuType")).findElement(By.xpath("//option[@value='modbus']")).click();
        driver.findElement(By.id("createDeviceForModbusForm")).findElement(By.className("equipName")).sendKeys('owenTest');
        driver.findElement(By.id("createDeviceForModbusForm")).findElement(By.className("dtuPrefix")).sendKeys('modbus' + new Date().getTime());
        // 提交数据创建modbus节点
        driver.findElement(By.id("addDtuNode")).click();
    }
}
module.exports = createModbusDevice;