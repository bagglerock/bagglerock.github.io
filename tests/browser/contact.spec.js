import { test, expect } from '@playwright/test';

for (const view of ['enhanced', 'simple']) {
  test(`Contact navigation reaches the email link in ${view} view`, async ({ page }) => {
    await page.addInitScript(view => localStorage.setItem('portfolio-view', view), view);
    await page.goto('/');
    await page.locator('nav a[href="#contact"]').click();
    await expect(page).toHaveURL(/section=contact/);
    await expect(page.locator('.email-link')).toBeInViewport({ ratio: 0.95 });
    await expect(page.locator('.email-link')).toBeFocused();
    await page.locator('nav a[href="#work"]').click();
    await expect(page.locator('.email-link')).not.toBeInViewport();
    await page.locator('nav a[href="#contact"] span').click();
    await expect(page.locator('.email-link')).toBeInViewport({ ratio: 0.95 });
  });
}

test('Contact reaches the details from About in short windows', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('portfolio-view', 'enhanced'));
  for (const width of [1440, 1024, 820, 390]) {
    await page.setViewportSize({ width, height: 500 });
    await page.goto('/?section=experience');
    await page.locator('nav a[href="#contact"]').click();
    await expect(page.locator('.email-link')).toBeInViewport({ ratio: 0.95 });
    await page.reload();
    await expect(page.locator('.email-link')).toBeInViewport({ ratio: 0.95 });
  }
});
