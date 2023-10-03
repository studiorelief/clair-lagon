import './index.css';

import { dataMirrorHero, eauHero, messageHero, plageHero, totalHero } from '$utils/hero';

window.Webflow ||= [];
window.Webflow.push(() => {
  // hero calculator
  messageHero();
  totalHero();
  dataMirrorHero();
  plageHero();
  eauHero();
});
