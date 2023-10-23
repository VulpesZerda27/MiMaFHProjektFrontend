const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Login', function () {
    this.timeout(10000);  // Set timeout to 10 seconds
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        await driver.quit();
    });

    it('should login and get corresponding email from accessToken', async () => {
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

        await driver.wait(async function() {
            const jwtToken = await driver.executeScript('return localStorage.getItem("accessToken");');
            return jwtToken !== null;
        }, 10000, 'JWT token was not found in the given time frame');

        const jwtToken = await driver.executeScript('return localStorage.getItem("accessToken");');
        const base64Payload = jwtToken.split('.')[1];
        const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString('utf8'));
        assert(payload.email === 'alice@bookshop.com', 'Email in JWT token does not match the login email');
    });
});
