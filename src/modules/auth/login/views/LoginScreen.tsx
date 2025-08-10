import React from "react";
import SubmitButton from "@/common/components/button/SubmitButton";
import InputPassword from "@/common/components/input/InputPassword";
import InputText from "@/common/components/input/InputText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { setCookieClient } from "@/common/utils/cookies";
import { LoginRequest } from "@/modules/auth/login/models/type";
import { LoginSchema } from "@/modules/auth/login/schema/schema";

const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(LoginSchema),
    reValidateMode: "onBlur",
  });

  const router = useRouter();

  const onSubmit = (data: LoginRequest) => {
    if (data.email === "admin@admin.com" && data.password === "admin.com") {
      alert("Login sukses!");
      setCookieClient("token", "token");
      router.push("/sales");
    } else {
      confirm("Email atau password salah!");
    }
  };
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>

      <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <InputText
          label="Email"
          name="email"
          register={register}
          placeholder="Masukkan Email"
          requiredMark
        />

        <InputPassword
          label="Password"
          name="password"
          register={register}
          placeholder="Masukkan Password"
          requiredMark
        />

        <SubmitButton label="Login" disabled={false} />
      </form>
    </div>
  );
};

export default LoginScreen;
