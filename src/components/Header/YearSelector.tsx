import { useSettings } from "../../hooks/useSettings";
import { onYearChange } from "../../store/settings";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 4 }, (_, i) => currentYear - 1 + i);

export const YearSelector = () => {
  const { year = currentYear } = useSettings();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onYearChange(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <select
        aria-label="Year selector"
        value={year}
        className="select select-ghost"
        onChange={onChange}
      >
        <option disabled>Select a year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};
