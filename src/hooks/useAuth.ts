import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const { setUser, logout, user } = useAuthStore();

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/auth/me");
      setUser(data.user);
      return data.user;
    },
    enabled: !!user,
  });

  const registerMutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      password: string;
    }) => {
      const { data } = await axiosInstance.post("/auth/sendotp", payload);
      setUser(data.user);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      setUser(data.user);
    },
  });

  const VerifyEmailMutation = useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      const { data } = await axiosInstance.post("/auth/validate", payload);
      return data;
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: async (payload: { email: string }) => {
      const { data } = await axiosInstance.post("/auth/resentotp", payload);
      return data;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/auth/logout");
      logout();
    },
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    VerifyEmailMutation,
    resendOtpMutation,
    user,
  };
};
