import './index.css';

import {
  initAboutTextAppear,
  initEngagementParallax,
  initFeaturesStack,
  initHeroParallax,
  initIntelligenceEllipses,
  initIntelligenceTextAppear,
  initTagsAppear,
} from '$utils/gsap';

const runAnimations = () => {
  initTagsAppear();
  initAboutTextAppear();
  initEngagementParallax();
  initIntelligenceEllipses();
  initFeaturesStack();
  initHeroParallax();
  initIntelligenceTextAppear();
};

// Si on est sur un embed Webflow, Webflow appelle lui-même la queue `window.Webflow.push`.
// Sinon, on exécute dès que le DOM est prêt.
if (window.Webflow && typeof window.Webflow.push === 'function') {
  window.Webflow.push(runAnimations);
} else {
  window.addEventListener('DOMContentLoaded', runAnimations);
}
