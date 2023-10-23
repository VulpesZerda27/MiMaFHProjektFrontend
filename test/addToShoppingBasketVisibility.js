const {Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');

let driver;

describe('Shopping basket visibility', function() {
    this.timeout(30000);

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    after(async function() {
        await driver.quit();
    });

    it('should not display "Add to Basket" button before login', async function() {
        await driver.get('http://127.0.0.1:8081');
        await driver.sleep(1000);
        const addToBasketButtons = await driver.findElements(By.css('.add-to-basket-btn'));
        if(addToBasketButtons.length > 0) {
            const displayStyle = await driver.executeScript('return arguments[0].style.display;', addToBasketButtons[0]);
            assert.equal(displayStyle, 'none', 'Add to Basket button should not be displayed before login');
        } else {
            assert.ok(true, 'Button is not present, which means its not displayed.');
        }
    });

    it('should display "Add to Basket" button after login', async function() {
        await driver.get('http://127.0.0.1:8081');
        const loginLink = await driver.findElement(By.css('a.nav-link.text-info[href="./html/login.html"]'));
        await loginLink.click();
        await driver.findElement(By.id('username-login')).sendKeys('alice@bookshop.com');
        await driver.findElement(By.id('password-login')).sendKeys('onepillmakesyoularger');
        await driver.findElement(By.id('login-button')).click();

        await driver.wait(async function() {
            const jwtToken = await driver.executeScript('return localStorage.getItem("accessToken");');
            return jwtToken !== null;
        }, 10000);

        await driver.sleep(1000);
        const addToBasketButton = await driver.findElement(By.css('.add-to-basket-btn'));
        const displayStyle = await driver.executeScript('return arguments[0].style.display;', addToBasketButton);

        assert.equal(displayStyle, 'block', 'Add to Basket button should be displayed after login');
    });
});
