import { addDays } from "date-fns";
import { map } from "nanostores";
import { getEventId } from "../utils/calendar";
import { getDay, getDayIdByDate } from "../utils/date";
import { toggleEvent } from "./calendar";
import { $settings, DEFAULTS } from "./settings";

export type MODE = "draw";

export interface Command {
  mode?: MODE;
  selected?: string;
  labelEditId?: string;
}

export const $command = map<Command>({
  mode: undefined,
  selected: undefined,
  labelEditId: undefined,
});

export const onStartDraw = (id: string, isRange: boolean) => {
  const { color, pattern } = $settings.get() || DEFAULTS;
  toggleEvent(getEventId(color, pattern), id);
  $command.setKey("mode", "draw");

  const { selected } = $command.value;
  $command.setKey("selected", id);

  if (isRange && selected) {
    const [day1, month1, year1] = selected.split(".").map((i) => parseInt(i));
    const [day2, month2, year2] = id.split(".").map((i) => parseInt(i));
    const [startDate, endDate] = [
      getDay(day1, month1, year1),
      getDay(day2, month2, year2),
    ].sort((a, b) => a.getTime() - b.getTime());
    let date = addDays(startDate, 1);
    while (endDate > date) {
      toggleEvent(getEventId(color, pattern), getDayIdByDate(date));
      date = addDays(date, 1);
    }
  }
};

export const onEndDraw = () => {
  $command.setKey("mode", undefined);
};

export const onCellDraw = (id: string) => {
  if ($command.value.mode === "draw") {
    const { color, pattern: fill } = $settings.get() || DEFAULTS;
    toggleEvent(getEventId(color, fill), id);
  }
};

export const onEditLabel = (id?: string) => {
  $command.setKey("labelEditId", id || "");
};
