import { HttpResponse } from "../models/api.response.models";

export const convertObjectToFormData = (
  obj: Record<string, unknown>
): FormData => {
  const formData = new FormData();

  const appendFormData = (value: unknown, key: string): void => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        appendFormData(item, `${key}[${index}]`);
      });
    } else if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([childKey, childValue]) => {
        appendFormData(childValue, `${key}.${childKey}`);
      });
    } else if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      formData.append(key, String(value));
    }
  };

  Object.entries(obj).forEach(([key, value]) => {
    appendFormData(value, key);
  });

  return formData;
};

export function getHeaders({
  isFormData,
  authToken,
}: {
  isFormData?: boolean;
  authToken?: string;
} = {}) {
  return {
    Accept: "application/json",
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };
}

export function catchError(error: unknown): HttpResponse<null> {
  let message = "Something went wrong";
  if (error instanceof Error) {
    message = error.message;
  }

  return {
    details: {
      path: "",
      query: "",
      status_code: 500,
      method: "",
    },
    valid: false,
    data: null,
    message: message,
    errors: null,
  };
}
