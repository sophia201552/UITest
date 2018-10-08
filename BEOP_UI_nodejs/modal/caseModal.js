var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    promise = webdriver.promise,
    chrome = require('selenium-webdriver/chrome'); //TODO: 兼容其他浏览器
var Test = require('./testModal.js');
var CONFIG = require('../config');
var caseUtil = require('../controller/case.js')


class CaseUI extends Test {
    constructor(title, funcRun) {
        super();
        this.driver = undefined;
        this.assert = undefined;
        this.funcRun = funcRun;

        this.status = 0
        this.arrStep = []
        this.init();
    }

    init() {
        var options = new chrome.Options();
        options.addArguments("--start-maximized");
        options.addArguments("--disable-popup-blocking");
        options.addArguments("no-sandbox");
        options.addArguments("disable-extensions");
        options.addArguments("no-default-browser-check");
        var prefs = {
            "credentials_enable_service": false,
            "profile.password_manager_enabled": false
        };
        options.setUserPreferences(prefs);
        // options.setChromeBinaryPath('D:\\work\\BeopAutoTest\\driver\\chromedriver.exe')
        if (this.funcRun) {
            this.driver = new webdriver.Builder().forBrowser(CONFIG.DRIVER.BROWSER).setChromeOptions(options).build();
        }

        this.assert = new CaseStep(this);
    }



    run() {
        var deepCopy = function (source) {
            var result = {};
            for (var key in source) {
                result[key] = typeof source[key] === "object" ? deepCoyp(source[key]) : source[key];
            }
            return result;
        }
        let _this = this;
        let flow = promise.controlFlow();
        var promiseClone = deepCopy(promise);
        var promiseResultMap;

        var res = flow.execute(function () {
            _this.funcRun(_this.driver);
        }).then(function () {
            promiseResultMap = { status: 1, step: _this.arrStep };
        }).catch(function (e) {
            _this.status = 0;
            var e = e;
            _this.driver.takeScreenshot().then(function (result) {
                var msg = e.msg || e.message;
                if (e.type == 'assert') {
                    _this.arrStep.push({ name: 'assert error:' + msg, type: 2, screenCatch: result });
                } if (e.type == 'wait') {
                    _this.arrStep.push({ name: 'wait error:' + msg, type: 3, screenCatch: result });
                } else {
                    _this.arrStep.push({ name: 'unexpected error:' + msg, type: 3, screenCatch: result });
                }
                promiseResultMap = { status: 0, step: _this.arrStep };
            });
        }).then(function () {
            return promiseResultMap;
        });

        return res;

    }
    step(msg) {
        this.arrStep.push({ 'name': msg, 'type': 1 })
    }

    check(msg) {
        this.arrStep.push({ 'name': msg, 'type': 0 })
    }
}
module.exports = CaseUI;


class CaseStep {
    constructor(ui) {
        this.arrStep = ui.arrStep || [];
        this.driver = ui.driver;
        this.case = ui;
    }

    assert(con_1, con_2, opt) {
        var msg = '';
        var _this = this;
        if (typeof opt != 'undefined') {
            if (typeof opt == 'string') {
                msg = opt
            } else if (opt.msg) {
                msg = opt.msg;
            }
        }
        if (!this.isEqual(con_1, con_2)) {
            throw { 'type': 'assert', 'msg': msg };
            // var img ;
            // this.driver.takeScreenshot().then(function(result){
            //     img = result;
            //     _this.arrStep.push({name:msg,type:2,screenCatch:img})
            // }).then(function(){
            //     _this.case.status = 2
            //     throw {'type':'assert','msg':'case interrupt: ' + msg};
            // });            
        }
    }
    assertTrue(con, msg) {
        return this.assert(con, true, msg)
    }
    assertFalse(con, msg) {
        return this.assert(con, false, msg)
    }
    assertEqual(con_1, con_2, msg) {
        return this.assert(con_1, con_2, msg)
    }
    verify(con_1, con_2, opt) {
        var msg = '';
        if (typeof opt != 'undefined') {
            if (typeof opt == 'string') {
                msg = opt
            } else if (opt.msg) {
                msg = opt.msg;
            }
        }
        if (!this.isEqual(con_1, con_2)) {
            var img = this.driver.takeScreenshot();
            this.arrStep.push({ name: msg, type: 2, screenCatch: img })
            this.this.case.status = 2
        }
    }
    verifyTrue(con, msg) {
        return this.verify(con, true, msg)
    }
    verifyFalse(con, msg) {
        return this.verify(con, false, msg)
    }
    verifyEqual(con_1, con_2, msg) {
        return this.verify(con_1, con_2, msg)
    }
    waitfor(con_1, con_2, opt) {
        var msg = '';
        if (typeof opt != 'undefined') {
            if (typeof opt == 'string') {
                msg = opt
            } else if (opt.msg) {
                msg = opt.msg;
            }
        }
        return Promise.all(con_1, con_2).then(function () {
            if (!this.isEqual(con_1, con_2)) {
                this.arrStep.push({ name: 'msg', type: 2 });
            }
        })
    }
    waitforTrue(con, msg) {
        return this.waitfor(con, true, msg)
    }
    waitforFalse(con, msg) {
        return this.waitfor(con, true, msg)
    }
    waitforEqual(con_1, con_2, msg) {
        return this.waitfor(con_1, con_2, msg)
    }
    isEqual(con_1, con_2) {
        var handleCon_1, handleCon_2;
        var compareResult = false;

        handleCon_1 = (typeof con_1 == 'function') ? con_1() : con_1;
        handleCon_2 = (typeof con_2 == 'function') ? con_2() : con_2;

        if (typeof handleCon_1 == 'object' && typeof handleCon_2 == 'object') {
            if (handleCon_1.constructor == handleCon_2.constructor) {
                if (handleCon_1.constructor == Array) {
                    compareResult = this.isArrayEqual(handleCon_1, handleCon_2)
                } else if (handleCon_1.constructor == Object) {
                    compareResult = this.isObjEqual(handleCon_1, handleCon_2)
                } else {
                    compareResult = false;
                }
            } else {
                compareResult = false;
            }
        } else {
            compareResult = (handleCon_1 == handleCon_2)
        }

        return compareResult;
    }
    isArrayEqual(arr_1, arr_2) {
        if (arr_1.length == arr_2.length) {
            for (var i = 0; i < arr_1.length; i++) {
                if (!this.isEqual(arr_1[i], arr_2[i])) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
    isObjectEqual(obj_1, obj_2) {
        var keys_1 = Object.keys(obj_1),
            keys_2 = Object.keys(obj_2),
            values_1 = Object.values(obj_1),
            values_2 = Object.values(obj_2)
        return (this.isArrayEqual(keys_1, keys_2) && this.isArrayEqual(values_1, values_2))
    }

    isObjEqual(x, y) {
        // If both x and y are null or undefined and exactly the same 
        if (x === y) {
            return true;
        }

        // If they are not strictly equal, they both need to be Objects 
        if (!(x instanceof Object) || !(y instanceof Object)) {
            return false;
        }

        //They must have the exact same prototype chain,the closest we can do is
        //test the constructor. 
        // 用于区别数组和对象
        if (x.constructor !== y.constructor) {
            return false;
        }

        for (var p in x) {
            //Inherited properties were tested using x.constructor === y.constructor
            if (x.hasOwnProperty(p)) { // 自身属性,非原型链属性
                // Allows comparing x[ p ] and y[ p ] when set to undefined 
                if (!y.hasOwnProperty(p)) {
                    return false;
                }

                // If they have the same strict value or identity then they are equal 
                if (x[p] === y[p]) {
                    continue;
                }

                // Numbers, Strings, Functions, Booleans must be strictly equal 
                if (typeof (x[p]) !== "object") {
                    return false;
                }

                // Objects and Arrays must be tested recursively 
                //if (!Object.equals(x[p], y[p])) { // to-do edit
                if (!this.isObjEqual(x[p], y[p])) { // to-do edit
                    return false;
                }
            }
        }

        for (p in y) {
            // allows x[ p ] to be set to undefined 
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    };


}