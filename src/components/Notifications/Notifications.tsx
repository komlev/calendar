import { useStore } from "@nanostores/preact";
import { $notifications } from "../../store/notifications";
import { Notification } from "./Notification";

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
