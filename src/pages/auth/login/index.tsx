import SubmitButton from "@/common/components/button/SubmitButton";
import InputPassword from "@/common/components/input/InputPassword";
import InputText from "@/common/components/input/InputText";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginRequest } from "./models/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "./schema/schema";
import { useRouter } from "next/router";
import { setCookieClient } from "@/common/utils/cookies";

const Login = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

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
    </div>
  );
};

export default Login;
