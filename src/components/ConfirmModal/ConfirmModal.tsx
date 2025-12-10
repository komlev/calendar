import type { FC } from "preact/compat";
import { Modal } from "../Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  className?: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  className = "",
}) => {
  const onConfirmClick = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      id="confirm"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className={className}
      footer={
        <div className="flex w-full flex-col-reverse justify-end gap-2 sm:flex-row">
          <button
            id="modal-cancel-btn"
            type="button"
            className="btn btn-outline w-full sm:w-auto"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            id="modal-confirm-btn"
            type="button"
            aria-keyshortcuts={isOpen ? "enter" : undefined}
            className="btn btn-primary w-full sm:w-auto"
            onClick={onConfirmClick}
          >
            {confirmText}
          </button>
        </div>
      }
    >
      <div role="alertdialog" aria-describedby="confirm-modal-message">
        <p id="confirm-modal-message">{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
