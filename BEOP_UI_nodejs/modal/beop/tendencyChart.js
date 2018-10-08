var BaseSrc = require('../baseScr.js');
var CaseUI = require('../caseModal.js');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    actions = webdriver.actions;

class tendencyChart extends BaseSrc {
    constructor(driver,assert) {
        super(driver);
        this.driver = driver;
        this.assert = assert;
    }

    show() {
        let driver = this.driver;
        let caseUI= new CaseUI();
        let baseScr = new BaseSrc();
        driver.sleep(2000);
        // 1、 单击新建工作簿。 进入工作簿。
        //断言开始
        baseScr.isExist(driver.findElements(By.css('.breadcrumb li')),caseUI.assert.assertTrue.bind(this.assert),"元素没找到");
        //断言结束
        driver.findElements(By.css('.breadcrumb li')).then(function(lis){
            lis[0].click();
        });
        driver.findElement(By.className('ws-add')).findElement(By.className('wsCtn')).click();
        driver.sleep(1000);    
        driver.findElements(By.className('wsCtn')).then(function(ctns){
            ctns[ctns.length - 2].click();
        }).then(function(e){
            console.log("eee")
        });
        driver.sleep(1000);  
        // 2、 单击添加Slider。 弹出Slider类型选择页面。
        driver.findElement(By.className('slider-item-add')).click();
        driver.sleep(1000); 
        // 3、 点击趋势图。 弹出趋势图配置窗口。
        driver.findElement(By.css(".anlsTemplate[templatetype='AnlzTendency']")).click();
        //打开上海华为数据源面板
        driver.findElement(By.id("liCloud")).click();
        driver.findElement(By.className("select2")).click();
        driver.findElement(By.css("option[value='72']")).click();
        driver.sleep(3000); 
        // 4、 拖入数据源A、 B。 数据源A、 B被正确填充。
        let dragEleA = driver.findElement(By.css("tr[ptid='5948a70d833c972d8ce95cad']"));
        let dragEleB = driver.findElement(By.css("tr[ptid='5948a70d833c972d8ce95cb1']"));
        baseScr.isExist(dragEleA,caseUI.assert.assertTrue.bind(this.assert),"元素没找到");//断言
        baseScr.isExist(dragEleB,caseUI.assert.assertTrue.bind(this.assert),"元素没找到");//断言
        let dropEle = driver.findElement(By.css(".divConfigData[datatype='X']")).findElement(By.className("dataDragTip"));
        dropEle.getLocation().then(function(result){
            console.log(result)
        })
        baseScr.isExist(dropEle,caseUI.assert.assertTrue.bind(this.assert),"元素没找到");//断言
        driver.sleep(1000);  
        // driver.actions().mouseMove(dragEleA).click().perform();
        // driver.sleep(1000); 
        // // driver.actions().mouseMove(dragEle).perform();
        // driver.actions().mouseMove(dragEleB).click().perform();
        // driver.sleep(1000); 
        // driver.actions().dragAndDrop(dragEleB,dropEle).perform(); 
        // driver.actions().mouseMove(dragEleB).click().mouseMove(dragEleB).mouseDown().mouseMove({x: 290, y: 548}).mouseUp().perform();
        driver.executeScript(function(){
            // $("#tableDsCloud").off("dragstart","tr").on("dragstart","tr",function(e){
            //     e.dataTransfer.setData("Text",ev.target.id);
            // })
            // $("#dataConfig").off('dragenter','.dataDragTip').on('dragenter','.dataDragTip',function(e){
            //     e.preventDefault();
            // });
            // $("#dataConfig").off('dragover','.dataDragTip').on('dragover','.dataDragTip',function(e){
            //     e.preventDefault();
            // });
            // $("#dataConfig").off('drop','.dataDragTip').on('drop','.dataDragTip',function(e){
            //     e.preventDefault();
            // });
            var tpl = `<div class="col-lg-3 col-xs-4 divDSConfigure grow" dsid="594b7f06833c97548ac8847d" foldername="undefined"><span class="contentDS" title="CH7_COPOwnerE14F63943_dr">CH7_COPOwnerE14F63943_dr</span><span class="glyphicon glyphicon-remove btnRemoveDS" aria-hidden="true"></span></div>`
            $(".divConfigData[datatype='X']").find(".rowDataValue").prepend(tpl);
            $("#startConfig").removeClass("disabled");
        });
        driver.sleep(5000); 
        //5、单击确定。 跳转到Slider内容页面， 且Canvas显示正确， 图例显示正确。
        driver.findElement(By.id("startConfig")).click();
        driver.sleep(12000); 
        // driver.findElement(By.css("#modalConfigContainer .close")).click();
        // driver.sleep(3000); 
        //6、删除 Slider。 Slider从工作簿被移除。
        let slider = driver.findElement(By.css(".divPage.selected"));
        driver.actions().mouseMove(slider).perform();
        driver.sleep(1000); 
        driver.findElement(By.css(".divPage.selected .btnRemove")).click();
        //7、 删除工作簿。 工作簿被移除。
        driver.findElements(By.css('.breadcrumb li')).then(function(lis){
            lis[0].click();
        });
        driver.sleep(1000);    
        driver.findElements(By.className('wsCtn')).then(function(ctns){
            let infoWrap = ctns[ctns.length - 2].findElement(By.className("infoWrap"));
            let btnWsRemove = ctns[ctns.length - 2].findElement(By.className("btnWsRemove"));
            driver.actions().mouseMove(infoWrap).click(btnWsRemove).perform();
            driver.sleep(1000);
            driver.findElement(By.css("button[i18n='common.CONFIRM']")).click();
        });
    }
}
module.exports = tendencyChart;