import React from "react";
import * as yup from "yup";
import { LoginRequest } from "../models/type";

export const LoginSchema: yup.ObjectSchema<LoginRequest> = yup.object({
  email: yup.string().email("Format harus Email").required("Email harus diisi"),
  password: yup.string().required("Password harus diisi"),
});
