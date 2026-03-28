import { nanoid } from "nanoid";
import { atom } from "nanostores";
import type { ReactNode } from "preact/compat";

export type TYPE = "success" | "info" | "error";

export type Notification = {
  id: string;
  content: ReactNode;
  type: TYPE;
};

export const $notifications = atom<Notification[]>([]);

export const addNotification = (content: ReactNode, type: TYPE = "info") => {
  $notifications.set([
    ...$notifications.get(),
    { id: nanoid(), content, type },
  ]);
};

export const removeNotification = (id: string) => {
  $notifications.set([...$notifications.get().filter((n) => n.id !== id)]);
};
