import clsx from "clsx";
import {
  useRef,
  useState,
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  Suspense,
} from "react";
import { createPortal } from "react-dom";
import { clearCalendar, exportCalendar } from "../../store/calendar";
import { addNotification } from "../../store/notifications";
import { ConfirmModal } from "../ConfirmModal";
import { useConfirmModal } from "../ConfirmModal/useConfirmModal";
import { ExportIcon } from "../icons/ExportIcon";
import { HelpIcon } from "../icons/HelpIcon";
import { ImportIcon } from "../icons/ImportIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { ImportModal } from "../ImportModal/ImportModal";
import { onHelp } from "../../store/settings";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

export const SettingsSelect: FC<Props> = (props) => {
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

  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => detailsRef.current?.removeAttribute("open");

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const onClearData = () => {
    onConfirmOpen({
      title: "Delete All Data",
      message: "Are you sure you want to delete all data?",
      onConfirm: () => clearCalendar(),
    });
    closeMenu();
  };

  const onExportData = () => {
    try {
      const data = exportCalendar();
      if (data) {
        navigator.clipboard.writeText(data);
        addNotification("Copied to clipboard");
      }
      closeMenu();
    } catch (_err) {
      addNotification("Export error", "error");
    }
  };

  const onHelpClick = () => {
    onHelp(true);
    closeMenu();
  };

  return (
    <>
      <ul
        {...props}
        className={clsx("menu menu-horizontal px-1", props.className)}
      >
        <li>
          <details ref={detailsRef}>
            <summary>Settings</summary>
            <ul className="bg-base-100 justify-self-end rounded-t-none p-2">
              <li>
                <button
                  className="whitespace-nowrap"
                  onClick={() => setIsImportModalOpen(true)}
                >
                  <ImportIcon width={20} height={20} />
                  Import Data
                </button>
              </li>
              <li>
                <button className="whitespace-nowrap" onClick={onExportData}>
                  <ExportIcon width={20} height={20} />
                  Export Data
                </button>
              </li>
              <li>
                <button className="whitespace-nowrap" onClick={onClearData}>
                  <TrashIcon width={20} height={20} />
                  Clear Data
                </button>
              </li>
              <li>
                <button className="whitespace-nowrap" onClick={onHelpClick}>
                  <HelpIcon width={20} height={20} />
                  Help
                </button>
              </li>
            </ul>
          </details>
        </li>
      </ul>
      {createPortal(
        <Suspense fallback={null}>
          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={onConfirmClose}
            onConfirm={onConfirm}
            title={title}
            message={message}
            confirmText={confirmText}
            cancelText={cancelText}
          />
        </Suspense>,
        document.body
      )}
      {createPortal(
        <Suspense fallback={null}>
          <ImportModal
            isOpen={isImportModalOpen}
            onClose={() => {
              setIsImportModalOpen(false);
            }}
          />
        </Suspense>,
        document.body
      )}
    </>
  );
};
