import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import LandingButton from "./landing-button.vue";

describe("Landing Button", () => {
  it("renders the provided label", async () => {
    const label = "Join the Chat Now";

    const wrapper = await mountSuspended(LandingButton, {
      props: {
        label: label
      }
    });

    expect(wrapper.text()).toEqual(label);
  });

  it("emits click event when clicked", async () => {
    const wrapper = await mountSuspended(LandingButton);
    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("click")).toBeDefined();
  });
});
