import { useCallback, useState } from "react";

interface UseConfirmModalReturn {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onOpen: (params: {
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
  }) => void;
  onClose: () => void;
}

export const useConfirmModal = (): UseConfirmModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [confirmText, setConfirmText] = useState("Confirm");
  const [cancelText, setCancelText] = useState("Cancel");
  const [confirmCallback, setConfirmCallback] = useState<() => void>(() => {});

  const onOpen = useCallback(
    ({
      title,
      message,
      onConfirm,
      confirmText = "Confirm",
      cancelText = "Cancel",
    }: {
      title: string;
      message: string;
      onConfirm: () => void;
      confirmText?: string;
      cancelText?: string;
    }) => {
      setTitle(title);
      setMessage(message);
      setConfirmCallback(() => onConfirm);
      setConfirmText(confirmText);
      setCancelText(cancelText);
      setIsOpen(true);
    },
    []
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onConfirm = useCallback(() => {
    confirmCallback();
  }, [confirmCallback]);

  return {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onOpen,
    onClose,
  };
};
