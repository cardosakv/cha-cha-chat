import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import ChatBoxIconButton from "./chat-box-icon-button.vue";

describe("Chatbox Icon Button", () => {
  it("emits click event when clicked", async () => {
    const wrapper = await mountSuspended(ChatBoxIconButton);
    wrapper.find("div").trigger("click");

    expect(wrapper.emitted("click")).toBeDefined();
  });
});
