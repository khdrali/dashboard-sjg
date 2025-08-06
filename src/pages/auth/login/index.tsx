import SubmitButton from "@/common/components/button/SubmitButton";
import InputPassword from "@/common/components/input/InputPassword";
import InputText from "@/common/components/input/InputText";
import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    // resolver: yupResolver(loginSchema),
    reValidateMode: "onBlur",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-7">
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
