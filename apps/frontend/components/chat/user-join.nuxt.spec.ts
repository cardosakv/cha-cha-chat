import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import UserJoin from "./user-join.vue";

describe("user Join", () => {
  it("renders provided username", async () => {
    const username = "mary";

    const wrapper = await mountSuspended(UserJoin, {
      props: {
        username: username
      }
    });

    expect(wrapper.text()).toContain(username);
  });
});
