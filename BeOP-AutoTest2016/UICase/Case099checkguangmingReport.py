__author__ = 'kirry'
import unittest
import datetime, time
from Methods.LoginTools import LoginTools
from Methods.MemcacheTools import MemcacheTools
from Methods.WebDriverTools import WebDriverTools
from Methods.OtherTools import OtherTools
from config import app
from time import sleep
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys


class Case099(unittest.TestCase):
    testCaseID = "Case099"
    projectName = "光明乳业"
    buzName = "验证报表不为空且没有异常数据..验证pdf和word的能下载,验证修改时间,有报表.验证报表链接,复制后内容正常"
    now = 'None'
    url = "http://%s" % app.config['SERVERIP']

    def setUp(self):
        self.start = datetime.datetime.now()
        self.startTime = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime()).split(" ")[-1]
        MemcacheTools.setMemTime(self.testCaseID,{"startTime":self.startTime})
        lg = LoginTools()
        self.driver = lg.InitialChrome(self.url, self.testCaseID)
        self.driver = lg.login(self.driver,'guangming')
        self.tools = WebDriverTools()

    def tearDown(self):
        if ("Exception" or "AssertionError" in str([x[1] for x in self._outcome.errors if x[1]!=None])) or self.errors:
            WebDriverTools.get_pic(self.driver, self.testCaseID)
        self.start = str((datetime.datetime.now() - self.start).seconds)
        self.start = self.start + "s"
        self.now = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime()).split(" ")[-1]
        self.driver.quit()
        MemcacheTools.setMemTime(self.testCaseID,{'start':self.startTime,'end':self.now})

    def Test(self):
        driver = self.driver
        self.errors = []
        tools = WebDriverTools()
        tools.enterProject(driver,425,self.projectName,self.errors)
        tools.enterPage(driver,['报表'],'#leftCtn',self.projectName)
        tools.CheckoperationReport(driver,self.projectName,self.errors)
        #tools.linkreport(driver,self.errors,self.projectName)
        OtherTools.raiseError(self.errors)
if __name__ == "__main__":
    suit = unittest.TestSuite()
    suit.addTest(Case099('Test'))
    runner = unittest.TextTestRunner()
    runner.run(suit)