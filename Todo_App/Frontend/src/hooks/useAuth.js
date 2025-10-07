import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ Use named import

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used inside an <AuthProvider>.");
  }
  return context;
};

export default useAuth;
