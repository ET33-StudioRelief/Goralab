import './index.css';

import {
  initAboutTextAppear,
  initEngagementParallax,
  initFeaturesStack,
  initHeroScale,
  initIntelligenceEllipses,
  initIntelligenceTextAppear,
  initTagsAppear,
} from '$utils/gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  initTagsAppear();
  initAboutTextAppear();
  initEngagementParallax();
  initIntelligenceEllipses();
  initFeaturesStack();
  initHeroScale();
  initIntelligenceTextAppear();
});
