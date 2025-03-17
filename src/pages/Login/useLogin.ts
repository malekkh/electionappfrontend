// src/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authServices"; // Importing the service
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate=useNavigate()
  return useMutation({
    mutationFn: ({ userName, password }: { userName: string; password: string }) =>
      login(userName, password), // Call the service function with parameters
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data?.user?.role); // Save the user's role
      console.log(data?.role);
      
      console.log(data?.user.role);
      
      if (data.user.role === "admin") {
        navigate("/dashboard"); // Admin dashboard
      } else {
        navigate("/voting");; // Voting page
      }
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
};
