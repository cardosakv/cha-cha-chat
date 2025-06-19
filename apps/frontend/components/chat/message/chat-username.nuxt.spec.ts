import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import ChatUsername from "./chat-username.vue";

describe("Chat Username", () => {
  it("should render the username correctly", async () => {
    const username = "mary";

    const wrapper = await mountSuspended(ChatUsername, {
      props: {
        username: username
      }
    });

    expect(wrapper.text()).toContain(username);
  });
});
