using System;
using System.Threading;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace SpotifyWebApiTest
{
    [TestClass]
    public class UnitTest1
    {
        static IWebDriver driver = new ChromeDriver();
        private WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));

        [TestInitialize]
        public void TestSetUp()
        {
           
            driver.Navigate().GoToUrl("localhost:3000");
        }

        [TestMethod]
        public void TestAfRedirect()
        {
            Thread.Sleep(10);

            IWebElement redirectButton = driver.FindElement(By.Id("LoginBtn")); // Skift til rigtig element
            redirectButton.Click();
            string URLBeforeRedirect = "localhost:3000"; // skift til rigtig url
            Assert.AreNotEqual(URLBeforeRedirect, driver.Url);


        }

        [TestMethod]
        public void TestEfterRedirect()
        {
            wait.Until(ExpectedConditions.ElementIsVisible(By.Id("GetTrackBtn"))); // Skift til det rigtige element
            IWebElement outputDiv = driver.FindElement(By.Id("output")); // Skift til den rigtige element
            IWebElement getTrackButton = driver.FindElement(By.Id(("GetTrackBtn"))); // Skift til det rigtige element
            string emptyOutput = "";
            getTrackButton.Click();
            Assert.AreNotEqual(emptyOutput, outputDiv.Text);

        }
       


        [TestCleanup]
        public void TestTearDown()
        {
            driver.Quit();
        }
    }
}
