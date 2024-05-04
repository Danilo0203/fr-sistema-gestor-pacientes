import { useEffect } from "react";
import { useAuthStore } from "../store/auth";

export const useLimpiarToken = () => {
  const clearToken = useAuthStore((state) => state.setClearToke);

  useEffect(() => {
    const handleBeforeUnload = () => {
      clearToken();
      localStorage.removeItem("auth");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [clearToken]);
};
