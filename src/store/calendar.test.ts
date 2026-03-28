import { beforeEach, describe, expect, it } from "vitest";
import {
  $calendar,
  clearCalendar,
  exportCalendar,
  importCalendar,
  labelEvent,
  toggleEvent,
} from "./calendar";

beforeEach(() => {
  clearCalendar();
});

describe("toggleEvent", () => {
  it("adds an event when none exists", () => {
    toggleEvent("red.solid", "1.0.2024");
    expect($calendar.get()["1.0.2024"]).toEqual({ type: "red.solid" });
  });

  it("removes an event when toggling the same type", () => {
    toggleEvent("red.solid", "1.0.2024");
    toggleEvent("red.solid", "1.0.2024");
    expect($calendar.get()["1.0.2024"]).toBeUndefined();
  });

  it("replaces event type when toggling a different type", () => {
    toggleEvent("red.solid", "1.0.2024");
    toggleEvent("blue.waves", "1.0.2024");
    expect($calendar.get()["1.0.2024"]).toEqual({ type: "blue.waves" });
  });

  it("preserves existing label when changing event type", () => {
    toggleEvent("red.solid", "1.0.2024");
    labelEvent("1.0.2024", "Birthday");
    toggleEvent("blue.solid", "1.0.2024");
    expect($calendar.get()["1.0.2024"]?.label).toBe("Birthday");
  });
});

describe("labelEvent", () => {
  it("adds a label to an existing event", () => {
    toggleEvent("red.solid", "5.3.2024");
    labelEvent("5.3.2024", "Holiday");
    expect($calendar.get()["5.3.2024"]?.label).toBe("Holiday");
  });

  it("does nothing if the event has no type", () => {
    labelEvent("5.3.2024", "Holiday");
    expect($calendar.get()["5.3.2024"]).toBeUndefined();
  });

  it("updates label on subsequent calls", () => {
    toggleEvent("red.solid", "5.3.2024");
    labelEvent("5.3.2024", "First");
    labelEvent("5.3.2024", "Second");
    expect($calendar.get()["5.3.2024"]?.label).toBe("Second");
  });
});

describe("exportCalendar / importCalendar", () => {
  it("exports calendar as a JSON string", () => {
    toggleEvent("red.solid", "1.0.2024");
    const json = exportCalendar();
    expect(JSON.parse(json)).toEqual({ "1.0.2024": { type: "red.solid" } });
  });

  it("imports and merges calendar data", () => {
    toggleEvent("red.solid", "1.0.2024");
    importCalendar(JSON.stringify({ "2.0.2024": { type: "blue.waves" } }));
    const cal = $calendar.get();
    expect(cal["1.0.2024"]).toEqual({ type: "red.solid" });
    expect(cal["2.0.2024"]).toEqual({ type: "blue.waves" });
  });

  it("throws on invalid JSON input", () => {
    expect(() => importCalendar("not json")).toThrow();
  });

  it("throws when imported data is not an object", () => {
    expect(() => importCalendar("[1, 2, 3]")).toThrow(
      "Invalid calendar data: expected a JSON object",
    );
    expect(() => importCalendar('"a string"')).toThrow(
      "Invalid calendar data: expected a JSON object",
    );
  });
});
