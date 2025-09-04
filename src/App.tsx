import { type FC } from "react";
import { ColumnView } from "./components/ColumnView/ColumnView";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { LabelModel } from "./components/LabelModel/LabelModel";
import { LinearView } from "./components/LinearView/LinearView";
import { MonthsView } from "./components/MonthsView/MonthsView";
import { Notifications } from "./components/Notifications/Notifications";
import { Palette } from "./components/Palette/Palette";
import { useCommand } from "./hooks/useCommand";
import { useSettings } from "./hooks/useSettings";
import { onEditLabel } from "./store/command";

export const App: FC = () => {
  const { tab = "Months", year = new Date().getFullYear() } = useSettings();
  const { labelEditId } = useCommand();

  return (
    <div className="bg-base-200 print:bg-base-100 flex flex-col gap-2">
      <Header />
      <Notifications />
      <Palette />
      <div className="p-1 print:p-0">
        {tab === "Months" && <MonthsView year={year} />}
        {tab === "Linear" && <LinearView year={year} />}
        {tab === "Columns" && <ColumnView year={year} />}
      </div>
      <LabelModel
        id={labelEditId}
        onClose={() => {
          onEditLabel();
        }}
      />
      <Footer />
    </div>
  );
};
