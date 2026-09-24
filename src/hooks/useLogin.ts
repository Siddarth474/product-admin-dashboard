"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { authService, LoginCredentials } from "@/services/auth.service";

interface ApiErrorResponse {
  message?: string;
}

export function useLogin() {
  const router = useRouter();

  const [login, setLogin] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    setError("");

    if (!login.username.trim() || !login.password.trim()) {
      setError("Username and password are required.");
      return;
    }

    try {
      setIsLoading(true);

      const data = await authService.login(login);

      localStorage.setItem("accessToken", data.accessToken);
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=86400; SameSite=Lax`;

      router.replace("/product");
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      const message =
        axiosError.response?.data?.message || "Invalid username or password.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    setLogin,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    handleSubmit,
  };
}
