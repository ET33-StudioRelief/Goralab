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

window.Webflow ||= [];
window.Webflow.push(() => {
  initTagsAppear();
  initAboutTextAppear();
  initEngagementParallax();
  initIntelligenceEllipses();
  initFeaturesStack();
  initHeroParallax();
  initIntelligenceTextAppear();
});
