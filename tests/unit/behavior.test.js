import test from "node:test";
import assert from "node:assert/strict";
import {
  carouselSlot,
  wrapIndex,
  projectProgress,
  fitLabelSize,
} from "../../assets/js/core/math.js";
import { createPlayback } from "../../assets/js/core/playback.js";
import { shouldEnhance } from "../../assets/js/core/experience-policy.js";
import { activeSection, sectionUrl } from "../../assets/js/core/section-url.js";
import { tabTarget } from "../../assets/js/components/tabs.js";

test("carousel wraps in both directions and keeps one centered item", () => {
  assert.equal(wrapIndex(-1, 5), 4);
  assert.equal(wrapIndex(5, 5), 0);
  assert.throws(() => wrapIndex(0, 0), RangeError);
  for (const count of [1, 2, 5, 6]) {
    for (let active = 0; active < count; active++) {
      const slots = Array.from({ length: count }, (_, i) =>
        carouselSlot(i, active, count),
      );
      assert.equal(slots.filter((slot) => slot === 0).length, 1);
      assert.equal(new Set(slots).size, count);
      assert.ok(slots.every((slot) => Math.abs(slot) <= count / 2));
    }
  }
});

test("playback suspends for hover/visibility, respects pause, and releases timers", () => {
  const timers = new Map();
  let id = 0,
    advances = 0;
  const clock = {
    setInterval(callback, delay) {
      assert.equal(delay, 3000);
      timers.set(++id, callback);
      return id;
    },
    clearInterval(key) {
      timers.delete(key);
    },
  };
  const playback = createPlayback({ advance: () => advances++, clock });
  const playing = {
    paused: false,
    hovered: false,
    visible: true,
    hidden: false,
  };
  playback.update(playing);
  playback.update(playing);
  assert.equal(timers.size, 1, "repeated updates must not duplicate timers");
  [...timers.values()][0]();
  assert.equal(advances, 1);
  for (const blocker of [
    { paused: true },
    { hovered: true },
    { visible: false },
    { hidden: true },
  ]) {
    playback.update({ ...playing, ...blocker });
    assert.equal(timers.size, 0);
    playback.update(playing);
    assert.equal(timers.size, 1);
  }
  playback.update({ ...playing, paused: true, hovered: true });
  playback.update({ ...playing, paused: true });
  assert.equal(timers.size, 0, "leaving hover must not undo an explicit pause");
  playback.update(playing);
  playback.destroy();
  playback.update(playing);
  assert.equal(timers.size, 0, "a disposed carousel cannot restart");
});

test("enhancement respects capability, explicit choice, and reduced motion", () => {
  assert.equal(shouldEnhance({ capable: false, choice: "enhanced" }), false);
  assert.equal(shouldEnhance({ capable: true }), true);
  assert.equal(shouldEnhance({ capable: true, reduced: true }), false);
  assert.equal(shouldEnhance({ capable: true, constrained: true }), false);
  assert.equal(shouldEnhance({ capable: true, choice: "simple" }), false);
  assert.equal(
    shouldEnhance({
      capable: true,
      choice: "enhanced",
      reduced: true,
      constrained: true,
    }),
    true,
  );
});

test("section links preserve other params and select the last reached chapter", () => {
  const url = sectionUrl(
    "https://example.com/?source=cv&section=home#work",
    "creative",
  );
  assert.equal(url.searchParams.get("source"), "cv");
  assert.equal(url.searchParams.get("section"), "creative");
  assert.equal(url.hash, "");
  const chapters = [
    { key: "next", top: 451 },
    { key: "home", top: -100 },
    { key: "work", top: 450 },
  ];
  assert.equal(activeSection(chapters, 1000), "work");
  assert.equal(activeSection([], 1000), undefined);
  assert.equal(
    chapters[0].key,
    "next",
    "selection must not mutate source order",
  );
});

test("project progress stays bounded and unpinned cards never roll away", () => {
  const scene = {
    top: 1000,
    bottom: 1800,
    height: 600,
    viewport: 900,
    pinTop: 100,
    pinned: true,
  };
  assert.deepEqual(projectProgress(scene), { reveal: 0, exit: 0 });
  assert.deepEqual(projectProgress({ ...scene, top: -1000, bottom: -200 }), {
    reveal: 1,
    exit: 1,
  });
  assert.equal(
    projectProgress({ ...scene, bottom: -200, pinned: false }).exit,
    0,
  );
  assert.equal(projectProgress({ ...scene, top: 100 }).reveal, 1);
});

test("ghost labels fit narrow screens and respect the desktop size cap", () => {
  assert.ok(Math.abs(fitLabelSize(300, 1000, 192) - 29.1) < 0.001);
  assert.equal(fitLabelSize(2000, 100, 192), 192);
  assert.equal(fitLabelSize(0, 100, 192), 0);
  assert.equal(fitLabelSize(300, 0, 192), 0);
});

test("tab keys wrap, support Home/End, and leave unrelated keys alone", () => {
  assert.equal(tabTarget("ArrowLeft", 0, 4), 3);
  assert.equal(tabTarget("ArrowRight", 3, 4), 0);
  assert.equal(tabTarget("Home", 2, 4), 0);
  assert.equal(tabTarget("End", 0, 4), 3);
  assert.equal(tabTarget("Tab", 0, 4), undefined);
});
