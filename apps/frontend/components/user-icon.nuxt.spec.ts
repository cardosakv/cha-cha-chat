import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import userIcon from "./user-icon.vue";

describe("User Icon", () => {
  it("renders avatar SVG based on username", async () => {
    const username = "alice";
    const wrapper = await mountSuspended(userIcon, {
      props: {
        username
      }
    });

    const div = wrapper.get("div");
    const svg = wrapper.find("svg");

    expect(svg.exists()).toBe(true);
    expect(div.attributes("title")).toEqual(username);
  });

  it("renders default avatar when username is null or undefined", async () => {
    const wrapper = await mountSuspended(userIcon);

    const div = wrapper.get("div");
    const svg = wrapper.find("svg");

    expect(svg.exists()).toBe(true);
    expect(div.attributes("title")).toBeUndefined();
  });
});
