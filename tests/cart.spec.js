const { test, expect } = require('@playwright/test');

test('Remove Backpack from the cart', async ({ page }) => {

    // 1. Open SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // 2. Login
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // 3. Find Backpack product card
    const backpack = page.locator('.inventory_item').filter({
        hasText: 'Sauce Labs Backpack'
    });

    // 4. Click Add to Cart on Backpack
    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    // 5. Verify cart badge shows 1
    const cartBadge = page.locator('.shopping_cart_badge');

    await expect(cartBadge).toHaveText('1');

    // 6. Click Remove on the SAME Backpack card
    await backpack.getByRole('button', { name: 'Remove' }).click();

    // 7. Verify cart badge is gone
    await expect(cartBadge).toHaveCount(0);

      });

// ---------------------------------------------------------
// TEST 2: Complete checkout
// ---------------------------------------------------------


test('Complete Backpack checkout', async ({ page })=>{



    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const backpack = page.locator('.inventory_item').filter({

        hasText:'Sauce Labs Backpack'
    });

await backpack.getByRole('button', {name:'Add to cart'}).click();
await page.locator('.shopping_cart_link').click();
await page.getByRole('button', {name:'Checkout'}).click();
await page.locator('#first-name').fill('Sunil');
await page.locator('#last-name').fill('Shetty');
await page.locator('#postal-code').fill('574102');

await page.getByRole('button', {name:'Continue'}).click();
await page.getByRole('button', {name:'Finish'}).click();


await expect(page.getByText('Thank you for your order!')).toBeVisible();


await page.locator('#react-burger-menu-btn').click();
await page.locator('#logout_sidebar_link').click();

await page.locator('#user-name').clear();
await page.locator('#password').clear();


});


