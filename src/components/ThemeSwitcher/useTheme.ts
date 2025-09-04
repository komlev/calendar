import { useEffect, useState } from "react";

const getIsDarkTheme = () => {
  try {
    return localStorage.getItem("isdark") === "true";
  } catch (_err) {
    return !!window?.matchMedia("(prefers-color-scheme: dark)").matches;
  }
};

export const useTheme = () => {
  const [isdark, setIsdark] = useState(getIsDarkTheme());
  useEffect(() => {
    localStorage.setItem("isdark", JSON.stringify(isdark));
  }, [isdark]);

  return { isdark, setIsdark };
};
