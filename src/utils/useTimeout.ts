import { useEffect } from "react";

export const useTimeout = (
  callback: () => void,
  timeout: number,
  depArr: any[]
) => {
  return useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, timeout);
    return () => clearTimeout(timer);
  }, depArr);
};
