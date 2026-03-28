import { describe, expect, it } from "vitest";
import { getBackgroundProperty, getEventId } from "./calendar";

describe("getEventId", () => {
  it("concatenates color and pattern with a dot", () => {
    expect(getEventId("red", "solid")).toBe("red.solid");
    expect(getEventId("blue", "waves")).toBe("blue.waves");
    expect(getEventId("green", "zigZag")).toBe("green.zigZag");
  });
});

describe("getBackgroundProperty", () => {
  it("returns a color string for solid pattern", () => {
    const result = getBackgroundProperty("red", "solid");
    expect(typeof result).toBe("string");
    expect(result?.length).toBeGreaterThan(0);
  });

  it("returns a data URL string for non-solid patterns", () => {
    const result = getBackgroundProperty("blue", "waves");
    expect(typeof result).toBe("string");
    expect(result).toContain("url(");
  });

  it("does not contain currentColor placeholder in output", () => {
    const result = getBackgroundProperty("red", "zigZag");
    expect(result).not.toContain("currentColor");
    expect(result).not.toContain("currentOpacity");
  });
});
