import { type FC, Suspense, useEffect, useState } from "react";
import { getCalendarCell, labelEvent } from "../../store/calendar";
import { FormControl } from "../FormControl/FormControl";
import { Modal } from "../Modal";

type Props = {
  id?: string;
  onClose: () => void;
};

export const LabelModel: FC<Props> = ({ id, onClose }) => {
  const [value, setValue] = useState("");
  const isOpen = !!id;

  useEffect(() => {
    if (isOpen) {
      setValue(getCalendarCell(id)?.label || "");
    }
  }, [isOpen, id]);

  const onSave = () => {
    if (id) {
      labelEvent(id, value);
    }
    onClose();
  };

  return (
    <Suspense fallback={null}>
      <Modal
        id="label"
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
            <button type="button" className="btn btn-primary" onClick={onSave}>
              Set Label
            </button>
          </div>
        }
        title="Cell Label"
        isOpen={isOpen}
        onClose={onClose}
      >
        <FormControl id="label-input" label="Cell Label">
          <input
            id="label-input"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSave();
              }
            }}
            value={value}
            required
            aria-required="true"
            type="text"
            placeholder="Label"
            className="input w-full"
          />
        </FormControl>
      </Modal>
    </Suspense>
  );
};
