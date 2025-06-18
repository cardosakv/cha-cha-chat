import { mountSuspended } from "@nuxt/test-utils/runtime";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TimeDivider from "./time-divider.vue";

describe("Time Divider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-10-01T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the formatted datetime for today timestamp", async () => {
    const todayTimestamp = new Date("2023-10-01T05:00:00Z").getTime();
    const formatted = formatDividerDate(todayTimestamp);

    const wrapper = await mountSuspended(TimeDivider, {
      props: {
        timestamp: todayTimestamp
      }
    });

    expect(wrapper.text()).toEqual(formatted);
  });

  it("renders the formatted datetime for last week timestamp", async () => {
    const weekTimestamp = new Date("2023-09-20T12:00:00Z").getTime();
    const formatted = formatDividerDate(weekTimestamp);

    const wrapper = await mountSuspended(TimeDivider, {
      props: {
        timestamp: weekTimestamp
      }
    });

    expect(wrapper.text()).toEqual(formatted);
  });

  it("renders the formatted datetime for previous months timestamp", async () => {
    const monthTimestamp = new Date("2023-06-01T12:00:00Z").getTime();
    const formatted = formatDividerDate(monthTimestamp);

    const wrapper = await mountSuspended(TimeDivider, {
      props: {
        timestamp: monthTimestamp
      }
    });

    expect(wrapper.text()).toEqual(formatted);
  });
});
