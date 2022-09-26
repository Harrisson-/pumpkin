import pumpkinBanner from "./src/components/pumpkin-banner.vue";

export function pumpkinExport() {
  console.log("This is a message from the demo package");
}

export function pumpkinComponents() {
  return {
    pumpkinBanner,
  };
}
