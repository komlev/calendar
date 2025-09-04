import { atom } from "nanostores";
import type { ReactNode } from "react";

export type TYPE = "success" | "info" | "error";

export type Notification = {
  id: string;
  content: ReactNode;
  type: TYPE;
};

export const $notifications = atom<Notification[]>([]);

let id = 0;
const getId = () => `${id++}`;

export const addNotification = (content: ReactNode, type: TYPE = "info") => {
  $notifications.set([...$notifications.get(), { id: getId(), content, type }]);
};

export const removeNotification = (id: string) => {
  $notifications.set([...$notifications.get().filter((n) => n.id !== id)]);
};
