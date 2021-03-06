__author__ = 'sophia'
from Methods.LoginTools import LoginTools
import unittest
import datetime, time
from Methods.WebDriverTools import WebDriverTools
from Methods.MemcacheTools import MemcacheTools
from Methods.OtherTools import OtherTools
from config import app
from time import sleep
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import ElementNotVisibleException


class Case046(unittest.TestCase):
    testCaseID = 'Case046'
    projectName = "上海华为"
    buzName = '系统诊断数目是否相等'
    now = 'None'
    errors = []
    url = "http://%s" % app.config['SERVERIP']
    project = (72, '上海华为')
    floorOnes=['.div-nav-box6','.div-nav-box1','.div-nav-box2']
    def setUp(self):
        self.start = datetime.datetime.now()
        self.startTime = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime()).split(" ")[-1]
        MemcacheTools.setMemTime(self.testCaseID, {'start':self.startTime})
        lg = LoginTools()
        self.driver = lg.InitialChrome(self.url, self.testCaseID)
        self.driver = lg.login(self.driver)
        self.tools = WebDriverTools()



    def Test(self):
        driver = self.driver
        self.errors = []
        self.tools.enterProject(driver, self.project[0], self.project[1], self.errors)
        self.tools.enterPage(driver,['设备','系统诊断','系统诊断'],'#paneIcon', self.projectName)
        self.clickDiagnosis(driver)
        OtherTools.raiseError(self.errors)


    def clickDiagnosis(self,driver):
        for f in range(len(self.floorOnes)):
            floorOne=driver.find_element_by_css_selector(self.floorOnes[f])
            if(f==0):
                pass
            else:
                floorOne.find_element_by_css_selector('.grow.subBuildingBtn').click()
            sleep(5)
            floorSecond=WebDriverWait(floorOne, 15).until(lambda x: x.find_elements_by_css_selector('.div-nav-row.subBuilding'))
            for index,fs in enumerate(floorSecond):
                print(fs.text+'即将点击')
                fs.find_element_by_css_selector('.div-row-icon-badge.grow.subBuildingItem').click()
                sleep(10)
                try:
                    floorSecond=WebDriverWait(floorOne, 30).until(lambda x: x.find_elements_by_css_selector('.div-nav-row.subBuilding'))
                except Exception as e:
                    print('%s页面30s没有加载出来'%fs.text)
                    assert 0,'%s页面30s没有加载出来'%fs.text
                text_warning=floorSecond[index].find_element_by_css_selector('.badge.warningCount').text
                text_alert=floorSecond[index].find_element_by_css_selector('.badge.alertCount').text
                print(text_warning)
                print(text_alert)
                total=None
                # WebDriverTools.waitSpinner(driver,'上海华为--系统诊断--楼层',timeout=25)
                # try:
                #     WebDriverWait(driver, 30).until_not(lambda x: x.find_elements_by_class_name('spinner'))
                #     print('%s页面30s内加载出来了'%fs.text)
                # except Exception as e:
                #     print('%s页面30s没有加载出来'%fs.text)
                #     assert 0,'%s页面30s没有加载出来'%fs.text
                #     continue
                WebDriverWait(driver, 30).until(lambda x: x.find_element_by_css_selector('#btnWarningLog'))
                warning_log_total=driver.find_element_by_css_selector('#btnWarningLog').text
                if(text_alert!='' and text_warning!='' ):
                    total=int(text_alert)+int(text_warning)
                elif(text_alert=='' and text_warning!=''):
                    total=int(text_warning)
                elif(text_warning=='' and text_alert!=''):
                    total=int(text_alert)
                else:
                    total=''
                if(warning_log_total!='' and total==int(warning_log_total)):
                    print('数目相等')
                elif(total== warning_log_total):
                    print('数目相等')
                else:
                    WebDriverTools.get_pic(driver, self.testCaseID)
                    assert 0,'%s诊断中左侧的数目之和为%s和右侧的数目为%s不相等'%(fs.text,str(total),str(warning_log_total))




    def tearDown(self):
        self.start = str((datetime.datetime.now() - self.start).seconds)
        self.start = self.start + "s"
        self.now = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime()).split(" ")[-1]
        self.driver.quit()
        MemcacheTools.setMemTime(self.testCaseID,{'start':self.startTime,'end':self.now})



if __name__ == "__main__":
    suite = unittest.TestSuite()
    suite.addTest(Case046('Test'))
    runner = unittest.TextTestRunner()
    runner.run(suite)