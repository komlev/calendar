import { useStore } from "@nanostores/preact";
import { $command } from "../store/command";

export const useCommand = () => {
  const command = useStore($command);
  return command;
};
