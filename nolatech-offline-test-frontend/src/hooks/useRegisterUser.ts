import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/api";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (userData: any) => registerUser(userData),
  });
};
