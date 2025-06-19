import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import ChatBoxInput from "./chat-box-input.vue";

describe("Chatbox Input", () => {
  it("emits keydownEnter when Enter is pressed without Shift", async () => {
    const wrapper = await mountSuspended(ChatBoxInput);
    wrapper.find("textarea").trigger("keydown", {
      key: "Enter",
      shiftKey: false
    });

    expect(wrapper.emitted("keydownEnter")).toBeDefined();
  });

  it("does not emit keydownEnter when Enter is pressed with Shift", async () => {
    const wrapper = await mountSuspended(ChatBoxInput);
    wrapper.find("textarea").trigger("keydown", {
      key: "Enter",
      shiftKey: true
    });

    expect(wrapper.emitted("keydownEnter")).not.toBeDefined();
  });
});
