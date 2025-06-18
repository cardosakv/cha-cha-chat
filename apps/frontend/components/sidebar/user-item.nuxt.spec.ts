import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import UserItem from "./user-item.vue";

describe("User Item", () => {
  it("renders provided username", async () => {
    const username = "joey";

    const wrapper = await mountSuspended(UserItem, {
      props: {
        username: username
      }
    });

    expect(wrapper.text()).toContain(username);
  });
});
