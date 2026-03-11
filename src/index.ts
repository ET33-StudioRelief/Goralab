import './index.css';

import {
  initAboutTextAppear,
  initEngagementParallax,
  initIntelligenceEllipses,
  initTagsAppear,
} from '$utils/gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  initTagsAppear();
  initAboutTextAppear();
  initEngagementParallax();
  initIntelligenceEllipses();
});
