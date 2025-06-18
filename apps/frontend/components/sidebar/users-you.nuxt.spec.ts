import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import UsersYou from "./users-you.vue";

describe("Users All", () => {
  it("renders all users set in props", async () => {
    const username = "mary";

    const wrapper = await mountSuspended(UsersYou, {
      props: {
        username: username
      }
    });

    expect(wrapper.html()).toContain(username);
  });
});
