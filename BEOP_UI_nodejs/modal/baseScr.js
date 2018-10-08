var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

class BaseScr {
    constructor(driver) {
        this.driver = driver;
    }

    // 单击
    eClick() {}
        // 双击
    eDoubleClick() {}
        // 鼠标悬浮
    eHover() {}
        // 拖拽开始
    eDragStart() {}
        // 拖拽结束
    eDragOver() {}
        // 滚动到
    eScroll() {}
    //判断webdriver是否存在
    isExist(webdriverElement,callback,msg){
        let isExist = false;
        if(typeof webdriverElement === "object"){
            // webdriverElement.then(function(result){
            //     if(Object.prototype.toString.call(result) === "[object Object]"){
            //         isExist = true;
            //         callback(isExist,msg)
            //     }else if(Object.prototype.toString.call(result) === "[object Array]"){
            //         if(result.length > 0){
            //             isExist = true;  
            //             callback(isExist,msg)                     
            //         }else{
            //             callback(isExist,msg)
            //         }
            //     }               
            // }).catch(function(e){
            //     callback(isExist,msg)
            // })
            webdriverElement.then(function(result){
                if(Object.prototype.toString.call(result) === "[object Object]"){
                    isExist = true;
                    // callback(isExist,msg)
                }else if(Object.prototype.toString.call(result) === "[object Array]"){
                    if(result.length > 0){
                        isExist = true;  
                        // callback(isExist,msg)                     
                    }else{
                        // callback(isExist,msg)
                    }
                }               
            }).catch(function(e){
                callback(isExist,msg)
            }).then(function(){
                callback(isExist,msg)
            })
        }else{
            callback(isExist,msg)
        }       
    }
}
module.exports = BaseScr;