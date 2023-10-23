const {By, until, Builder} = require("selenium-webdriver");
const assert = require('assert');
describe('Logout', function() {
    this.timeout(10000);  // Set timeout to 10 seconds
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        await driver.quit();
    });

    it('should delete accessToken after logout', async function() {
        await driver.manage().window().maximize();
        await driver.get('http://127.0.0.1:8081');

        const loginLink = await driver.findElement(By.css('a.nav-link.text-info[href="./html/login.html"]'));
        await driver.wait(until.elementIsVisible(loginLink), 5000);
        await loginLink.click();

        await driver.wait(until.titleContains('Login'), 5000);

        const usernameField = await driver.findElement(By.id('username-login'));
        await usernameField.sendKeys('alice@bookshop.com');

        const passwordField = await driver.findElement(By.id('password-login'));
        await passwordField.sendKeys('onepillmakesyoularger');

        const loginButton = await driver.findElement(By.id('login-button'));
        await loginButton.click();

        // Wait for accessToken to be present in localStorage
        await driver.wait(async () => {
            const token = await driver.executeScript('return localStorage.getItem("accessToken");');
            return token !== null;
        }, 10000, 'accessToken should be present after login');

        // Click the logout button
        const logoutButton = await driver.findElement(By.id('logout-button'));
        await logoutButton.click();
        await driver.sleep(1000);
        // Wait for alert, then accept it
        const alert = await driver.switchTo().alert();
        await alert.accept();

        // Check if the accessToken is deleted
        const tokenAfterLogout = await driver.executeScript('return localStorage.getItem("accessToken");');
        assert.equal(tokenAfterLogout, null, 'accessToken should be deleted after logout');
    });
});
