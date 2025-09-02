import { useState, useEffect } from "react";

type AuthState = {
  isAuthenticated: boolean;
  role: string | null;
};

function useAuth(): AuthState {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: !!localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setAuth({
        isAuthenticated: !!localStorage.getItem("token"),
        role: localStorage.getItem("role"),
      });
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return auth;
}

export default useAuth;
