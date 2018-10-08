var BaseSrc = require('../baseScr.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    cssSelector = webdriver.cssSelector;

class wordOrder extends BaseSrc {
    constructor(driver) {
        super(driver);
        this.driver = driver;
    }

    show() {
        let driver = this.driver;
        driver.getAllWindowHandles().then(function gotWindowHandles(allhandles) {
            driver.switchTo().window(allhandles[allhandles.length - 1]);
            driver.sleep(3000);
            // 1、 单击新建工单。 进入新建工单。
            driver.findElement(By.id("wf-task-filter-new-task")).click();
            // 2、 单击项目选择框。 选择web测试组。
            driver.sleep(3000);
            // this.selectele = driver.findElement(By.css("option[value='582878b5645514043025bacf']"));
            // driver.wait(until.elementIsSelected(this.selectele));
            driver.findElement(By.id("taskGroupSelector")).click();
            driver.findElement(By.css("option[value='582878b5645514043025bacf']")).click();
            // 3、 填写工单信息 。
            driver.findElement(By.id("taskTitle")).sendKeys("自动化测试");
            driver.findElement(By.id("taskDueTime")).sendKeys("2017-06-16");
            driver.findElement(By.id("wfDetail")).sendKeys("这是工单详情");
            // 4、 选择标签 。
            driver.findElement(By.id("wf-labelNames")).click();
            driver.findElement(By.id("wf-labelNames")).findElements(By.css("option")).then(function selectBug(options){
                options[allhandles.length - 1].click();
            });
            // 5、相关人员选择。
            driver.findElement(By.id("wfWatchersAdd")).click();
            driver.sleep(1000);
            driver.findElement(By.id("input-search-name")).sendKeys("luo");
            driver.findElement(By.css("div[data-user-id='2058']")).click();
            driver.findElement(By.id("wf-member-comfirm-btn")).click();
            driver.sleep(2000);
            // 6、 团队流程选择。
            driver.findElement(By.css("span[data-index='0']")).click();
            driver.sleep(1000);
            driver.findElement(By.id("input-search-name")).sendKeys("wu");
            driver.findElement(By.css("div[data-user-id='1101']")).click();
            driver.findElement(By.id("wf-member-comfirm-btn")).click();
            driver.sleep(1000);
            driver.findElement(By.css("span[data-index='1']")).click(); 
            driver.sleep(1000);
            driver.findElement(By.id("input-search-name")).sendKeys("yu");
            driver.findElement(By.css("div[data-user-id='73']")).click();
            driver.findElement(By.id("wf-member-comfirm-btn")).click();
            driver.sleep(2000);
            // 7、 完成填写，进行提交。
            driver.findElement(By.id("taskSave")).click();
            driver.sleep(3000);
        });    
    }
}
module.exports = wordOrder;