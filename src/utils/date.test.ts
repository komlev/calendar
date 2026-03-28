import { describe, expect, it } from "vitest";
import { getDay, getDayId, getDayIdByDate, getMonthType } from "./date";

describe("getDayId", () => {
  it("formats day, month, year into dot-separated string", () => {
    expect(getDayId(25, 11, 2024)).toBe("25.11.2024");
    expect(getDayId(1, 0, 2025)).toBe("1.0.2025");
  });
});

describe("getDayIdByDate", () => {
  it("returns zero-based month id from a Date", () => {
    // January is month 0
    const jan = new Date(2024, 0, 15);
    expect(getDayIdByDate(jan)).toBe("15.0.2024");

    const dec = new Date(2024, 11, 31);
    expect(getDayIdByDate(dec)).toBe("31.11.2024");
  });

  it("roundtrips with getDay", () => {
    const date = new Date(2025, 5, 20); // June 20
    const id = getDayIdByDate(date);
    const [day, month, year] = id.split(".").map(Number);
    const restored = getDay(day, month, year);
    expect(restored.getFullYear()).toBe(2025);
    expect(restored.getMonth()).toBe(5);
    expect(restored.getDate()).toBe(20);
  });
});

describe("getDay", () => {
  it("returns a Date at start of day for given day/month/year", () => {
    const d = getDay(15, 3, 2024); // April 15 (month 3)
    expect(d.getFullYear()).toBe(2024);
    expect(d.getMonth()).toBe(3);
    expect(d.getDate()).toBe(15);
    expect(d.getHours()).toBe(0);
    expect(d.getMinutes()).toBe(0);
  });
});

describe("getMonthType", () => {
  it("returns correct season for each month (zero-based)", () => {
    expect(getMonthType(0)).toBe("winter"); // January
    expect(getMonthType(1)).toBe("winter"); // February
    expect(getMonthType(2)).toBe("spring"); // March
    expect(getMonthType(4)).toBe("spring"); // May
    expect(getMonthType(5)).toBe("summer"); // June
    expect(getMonthType(7)).toBe("summer"); // August
    expect(getMonthType(8)).toBe("autumn"); // September
    expect(getMonthType(10)).toBe("autumn"); // November
    expect(getMonthType(11)).toBe("winter"); // December
  });
});
