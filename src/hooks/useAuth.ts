import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { setUser, logout, user } = useAuthStore();

  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      password: string;
    }) => {
      const { data } = await axiosInstance.post("/auth/sendotp", payload);
      setUser(data.user);
      return data.user;
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      setUser(data.data.user);
      return data.data.user;
    },
    onSuccess: (userData) => {
      router.push(`/@${encodeURIComponent(userData.name)}`);
    },
  });

  const VerifyEmailMutation = useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      const { data } = await axiosInstance.post("/auth/validate", payload);
      setUser(data.user);
      router.push("/dashboard");
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
    },
    onSuccess: () => {
      logout();
      router.push("/login");
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
