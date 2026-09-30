import {expect, test} from '@playwright/test';

test('home page exposes the primary shopping journey', async ({page}) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Robot Market|روبات مارکت/);
    await expect(page.locator('a[href="#showcase"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://panel.my-rm.com"]').first()).toBeVisible();
});
