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

let started = false;
const runOnce = () => {
  if (started) return;
  started = true;
  runAnimations();
};

// Cas 1 : Webflow est chargé et sa queue est fonctionnelle → on lui délègue
if (window.Webflow && typeof window.Webflow.push === 'function') {
  window.Webflow.push(runOnce);
}
// Cas 2 : Hébergement non-Webflow → fallback DOM natif uniquement
else {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', runOnce, { once: true });
  } else {
    // DOM déjà prêt (script chargé en différé ou en bas de page)
    runOnce();
  }
}
