import { beforeEach, describe, expect, it } from "vitest";
import {
  $notifications,
  addNotification,
  removeNotification,
} from "./notifications";

beforeEach(() => {
  $notifications.set([]);
});

describe("addNotification", () => {
  it("adds a notification with a unique id", () => {
    addNotification("Hello");
    const notifications = $notifications.get();
    expect(notifications).toHaveLength(1);
    expect(notifications[0].content).toBe("Hello");
    expect(notifications[0].type).toBe("info");
    expect(notifications[0].id).toBeTruthy();
  });

  it("accepts a custom type", () => {
    addNotification("Error!", "error");
    expect($notifications.get()[0].type).toBe("error");
  });

  it("generates unique ids for multiple notifications", () => {
    addNotification("A");
    addNotification("B");
    const [a, b] = $notifications.get();
    expect(a.id).not.toBe(b.id);
  });
});

describe("removeNotification", () => {
  it("removes a notification by id", () => {
    addNotification("Hello");
    const id = $notifications.get()[0].id;
    removeNotification(id);
    expect($notifications.get()).toHaveLength(0);
  });

  it("leaves other notifications intact", () => {
    addNotification("A");
    addNotification("B");
    const [a] = $notifications.get();
    removeNotification(a.id);
    expect($notifications.get()).toHaveLength(1);
    expect($notifications.get()[0].content).toBe("B");
  });
});
