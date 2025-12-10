import clsx from "clsx";
import type { FC, ReactNode } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";

interface ModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const Modal: FC<ModalProps> = ({
  id,
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = "",
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const titleId = `modalTitle-${id}`;

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isOpen) {
      modalElement.showModal();
      document.body.classList.add("modal-open");
    } else {
      modalElement.close();
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  return (
    <dialog
      onClose={onClose}
      ref={modalRef}
      className={clsx("modal", className)}
      aria-labelledby={titleId}
      aria-modal="true"
      aria-hidden={!isOpen}
      hidden={!isOpen}
    >
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            id="modal-close-btn"
            className="btn btn-xs btn-ghost absolute top-2 right-2"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </form>
        <h1 id={titleId} className="text-base-content text-4xl font-bold">
          {title}
        </h1>
        <div className="py-4">{children}</div>
        {footer && <div className="modal-action">{footer}</div>}
      </div>
    </dialog>
  );
};

export default Modal;
