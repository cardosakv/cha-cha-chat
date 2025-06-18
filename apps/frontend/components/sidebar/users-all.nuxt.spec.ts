import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import UsersAll from "./users-all.vue";

describe("Users All", () => {
  it("renders all users set in props", async () => {
    const usernames = ["alice", "joel", "mary"];

    const wrapper = await mountSuspended(UsersAll, {
      props: {
        usernames: usernames
      }
    });

    usernames.forEach((username) => {
      expect(wrapper.html()).toContain(username);
    });
  });
});
