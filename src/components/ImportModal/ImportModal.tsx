import { type FC, Suspense, useEffect, useState } from "react";
import { importCalendar } from "../../store/calendar";
import { addNotification } from "../../store/notifications";
import { FormControl } from "../FormControl/FormControl";
import { Modal } from "../Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ImportModal: FC<Props> = ({ isOpen, onClose }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValue("");
    }
  }, [isOpen]);

  const onImport = () => {
    try {
      importCalendar(value);
      addNotification("Imported successfully");
      onClose();
    } catch (_err) {
      addNotification("Import error. Corrupted string", "error");
      return;
    }
  };

  return (
    <Suspense fallback={null}>
      <Modal
        id="import"
        footer={
          <div className="flex w-full flex-col-reverse justify-end gap-2 sm:flex-row">
            <button
              id="modal-cancel-btn"
              type="button"
              className="btn btn-outline w-full sm:w-auto"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onImport}
            >
              Import
            </button>
          </div>
        }
        title="Import Calendar Data"
        isOpen={isOpen}
        onClose={onClose}
      >
        <FormControl id="import-textarea" label="Paste exported data">
          <textarea
            id="import-textarea"
            required
            aria-required="true"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder="Export string"
            className="textarea textarea-xs w-full"
          ></textarea>
        </FormControl>
      </Modal>
    </Suspense>
  );
};
