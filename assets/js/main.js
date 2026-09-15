import { initExperienceMode } from "./features/experience-mode.js";
import { initChapters } from "./features/chapters.js";
import { initProjectMotion } from "./features/project-motion.js";
import { initSectionNavigation } from "./features/section-navigation.js";
import { initGhostLabels } from "./features/ghost-labels.js";

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Layout composition must precede measurements and URL restoration.
const mode = initExperienceMode();
initChapters(mode);
initProjectMotion(mode);
initSectionNavigation(mode);
initGhostLabels(mode);
