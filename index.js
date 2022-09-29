import pumpkinBanner from "./src/components/pumpkin-banner.vue";
import pumpkinCrumb from "./src/components/pumpkin-crumb.vue";
import pumpkinTags from "./src/components/pumpkin-tags.vue";
import pumpkinSummary from "./src/components/pumpkin-summary.vue";
import pumpkinIntersectionSolo from "./src/components/pumpkin-intersection-solo.vue";
import pumpkinModal from "./src/components/pumpkin-modal.vue";
import pumpkinStepper from "./src/components/pumpkin-stepper.vue";


// function pumpkinExport() {
//   console.log("This is a message from the demo package");
// }

export default function install(Vue, options) {
  Vue.component("pumpkinBanner", pumpkinBanner);
  Vue.component("pumpkinCrumb", pumpkinCrumb);
  Vue.component("pumpkinTags", pumpkinTags);
  Vue.component("pumpkinSummary", pumpkinSummary);
  Vue.component("pumpkinIntersectionSolo", pumpkinIntersectionSolo);
  Vue.component("pumpkinModal", pumpkinModal);
  Vue.component("pumpkinStepper", pumpkinStepper);

  //  pumpkinExport,
}
