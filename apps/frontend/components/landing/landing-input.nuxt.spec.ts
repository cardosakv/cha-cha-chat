import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import LandingInput from "./landing-input.vue";

describe("Landing Input", () => {
  it("renders correct error text", async () => {
    const error = "Username is required.";

    const wrapper = await mountSuspended(LandingInput, {
      props: {
        error: error
      }
    });

    expect(wrapper.text()).toContain(error);
  });

  it("emits enter event when enter key is clicked", async () => {
    const wrapper = await mountSuspended(LandingInput);
    wrapper.find("input").trigger("keydown.enter");

    expect(wrapper.emitted("keyEnter")).toBeDefined();
  });
});
