import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 8 });
    Object.defineProperty(navigator, "deviceMemory", { get: () => 8 });
  });
});

test("carousel label/icon controls pause and resume after inspecting a logo", async ({
  page,
  isMobile,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/?section=creative");
  const toggle = page.locator(".carousel-toggle");
  await expect(toggle).toBeVisible();
  const activate = (locator) => (isMobile ? locator.tap() : locator.click());
  await activate(page.locator(".carousel-selected button"));
  await expect(toggle).toHaveText("Play");
  const selected = page.locator(".carousel-selected figcaption");
  const before = await selected.textContent();
  await activate(toggle.locator("svg"));
  await expect(toggle).toHaveText("Pause");
  await expect(selected).not.toHaveText(before);
  const playing = await selected.textContent();
  await expect(selected).not.toHaveText(playing, { timeout: 5000 });
  await activate(toggle.locator("span"));
  await expect(toggle).toHaveText("Play");
  const paused = await selected.textContent();
  await page.waitForTimeout(3200);
  await expect(selected).toHaveText(paused);
  expect(errors).toEqual([]);
});

test("repeated layout switches restore markup and do not duplicate enhancements", async ({
  page,
}) => {
  await page.goto("/");
  for (let i = 0; i < 3; i++) {
    await page
      .getByRole("button", { name: "Switch to the simple page layout" })
      .click();
    await expect(
      page.locator(".project-scene, .final-screen, .carousel-controls"),
    ).toHaveCount(0);
    await expect(page.locator(".logo-grid figure")).toHaveCount(5);
    await expect(page.locator("body > footer")).toHaveCount(1);
    await expect(page.locator(".earlier-work .earlier-grid")).toHaveCount(1);
    await page
      .getByRole("button", { name: "Switch to the enhanced page layout" })
      .click();
    await expect(page.locator(".project-scene")).toHaveCount(5);
    await expect(page.locator(".carousel-controls")).toHaveCount(1);
    await expect(page.locator(".final-screen")).toHaveCount(1);
  }
  for (const width of [390, 1024, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(page.locator('.career-tabs [role="tab"]')).toHaveCount(
      width < 768 ? 4 : 3,
    );
    await expect(page.locator(".project-scene")).toHaveCount(5);
    await expect(page.locator(".carousel-controls")).toHaveCount(1);
  }
});

test("deep links reload into contact and keyboard tabs remain usable", async ({
  page,
  isMobile,
}) => {
  await page.goto("/?source=test&section=contact");
  await expect(page.locator(".email-link")).toBeVisible();
  if (isMobile)
    await expect(
      page.getByRole("tab", { name: "Contact", exact: true }),
    ).toHaveAttribute("aria-selected", "true");
  await page.reload();
  await expect(page.locator(".email-link")).toBeVisible();
  await expect(page).toHaveURL(/source=test&section=contact/);
  const first = page.getByRole("tab", { name: "Experience", exact: true });
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Background", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("tab", { name: "Background", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
});

test("reduced motion defaults to the simple page and explicit choice survives reload", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".carousel-controls")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Switch to the enhanced page layout" })
    .click();
  await expect(page.locator(".carousel-toggle")).toHaveText("Play");
  await page.reload();
  await expect(page.locator(".carousel-controls")).toHaveCount(1);
});

test("the page content works with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:8000/");
  await expect(page.locator(".work .project")).toHaveCount(5);
  await expect(page.locator(".email-link")).toBeVisible();
  await expect(page.locator(".logo-grid figure")).toHaveCount(5);
  await context.close();
});
