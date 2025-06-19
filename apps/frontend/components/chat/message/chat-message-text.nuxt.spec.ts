import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import ChatMessageText from "./chat-message-text.vue";

describe("Chat Message (Text)", () => {
  it("should render the message correctly", async () => {
    const message = "Hello, world!";

    const wrapper = await mountSuspended(ChatMessageText, {
      props: {
        isOwn: true,
        text: message
      }
    });

    expect(wrapper.text()).toContain(message);
  });
});
