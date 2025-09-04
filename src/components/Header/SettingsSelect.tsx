import { createPortal } from "react-dom";
import { clearCalendar, exportCalendar } from "../../store/calendar";
import { ConfirmModal } from "../ConfirmModal";
import { useConfirmModal } from "../ConfirmModal/useConfirmModal";
import { ImportModal } from "../ImportModal/ImportModal";
import { useState } from "react";
import { addNotification } from "../../store/notifications";

export const SettingsSelect = () => {
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
    title,
    message,
    onConfirm,
    confirmText,
    cancelText,
  } = useConfirmModal();

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const onClearData = () => {
    onConfirmOpen({
      title: "Delete All Data",
      message: "Are you sure you want to delete all data?",
      onConfirm: () => clearCalendar(),
    });
  };

  const onExportData = () => {
    try {
      const data = exportCalendar();
      if (data) {
        navigator.clipboard.writeText(data);
        addNotification("Copied to clipboard");
      }
    } catch (_err) {
      addNotification("Export error", "error");
    }
  };

  return (
    <>
      <details>
        <summary>Settings</summary>
        <ul className="bg-base-100 rounded-t-none p-2 justify-self-end">
          <li>
            <button
              className="whitespace-nowrap"
              onClick={() => setIsImportModalOpen(true)}
            >
              Import Data
            </button>
          </li>
          <li>
            <button className="whitespace-nowrap" onClick={onExportData}>
              Export Data
            </button>
          </li>
          <li>
            <button className="whitespace-nowrap" onClick={onClearData}>
              Clear Data
            </button>
          </li>
        </ul>
      </details>
      {createPortal(
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={onConfirmClose}
          onConfirm={onConfirm}
          title={title}
          message={message}
          confirmText={confirmText}
          cancelText={cancelText}
        />,
        document.body,
      )}
      {createPortal(
        <ImportModal
          isOpen={isImportModalOpen}
          onClose={() => {
            setIsImportModalOpen(false);
          }}
        />,
        document.body,
      )}
    </>
  );
};
