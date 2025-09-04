import { useStore } from "@nanostores/react";
import { $command } from "../store/command";

export const useCommand = () => {
  const command = useStore($command);
  return command;
};
