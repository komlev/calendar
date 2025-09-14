import { useSettings } from "../../hooks/useSettings";
import { onHelp } from "../../store/settings";
import { Modal } from "../Modal";

export const HelpModal = () => {
  const { help } = useSettings();
  const onClose = () => {
    onHelp(false);
  };

  return (
    <Modal
      id="help"
      footer={
        <div className="flex w-full flex-col-reverse justify-end gap-2 sm:flex-row">
          <button
            id="modal-cancel-btn"
            type="button"
            className="btn btn-outline w-full sm:w-auto"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      }
      title="About"
      isOpen={!!help}
      onClose={onClose}
    >
      <div className="text-zinc-600 dark:text-zinc-200">
        <div className="font-bold">👋 Hello!</div>
        <p>Welcome to the Year Planner app.</p>
        <p>
          This app gives you a clear overview of the entire year in different
          formats: <b>Months</b>, <b>Linear</b> and <b>Columns</b> — making it
          easier to plan for the long term.
        </p>
        <div className="mt-2 font-bold">✨ Key features:</div>
        <ul className="list-inside list-disc">
          <li>All your data is stored locally on your device.</li>
          <li>
            You can export and share your plans with other devices via the{" "}
            <span className="badge badge-sm badge-ghost">Settings</span> menu.
          </li>
          <li>
            To quickly fill multiple days in a row, hold{" "}
            <span className="kbd kbd-sm">Shift</span>: it will select and fill
            all days from the first chosen date to the one you click.
          </li>
          <li>
            Jump back to <b>today’s date</b> anytime by clicking the{" "}
            <img
              src="/icon.svg"
              alt="YearPlanner Logo"
              className="inline h-5 w-5"
            />{" "}
            icon in the header.
          </li>
        </ul>
        <b>✋ Enjoy planning your year!</b>
      </div>
    </Modal>
  );
};
