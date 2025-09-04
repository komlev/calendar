import { useStore } from "@nanostores/react";
import { Notification } from "./Notification";
import { $notifications } from "../../store/notifications";

export const Notifications = () => {
  const list = useStore($notifications);

  return (
    <ul className="toast toast-end z-50">
      {list.map((n) => (
        <li key={n.id}>
          <Notification notification={n} />
        </li>
      ))}
    </ul>
  );
};
