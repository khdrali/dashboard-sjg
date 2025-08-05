import { cookies } from "next/headers";
import { DataResponse, HttpResponse } from "../models/api.response.models";
import {
  getHeaders,
  catchError,
  convertObjectToFormData,
} from "../utils/api.utils";

// ----------------------------------------------------------------------------

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ----------------------------------------------------------------------------

export const getAuthToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  const tokenSession = cookieStore.get("tokenSession");
  return tokenSession?.value || "";
};

// ----------------------------------------------------------------------------

export const getDataApi = async <TResponse extends DataResponse>(
  url: string
): Promise<HttpResponse<TResponse> | any> => {
  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: "GET",
      headers: getHeaders(),
    });

    const resJson: HttpResponse<TResponse> = await res.json();

    return resJson;
  } catch (error) {
    return catchError(error);
  }
};

export const postDataApi = async <TResponse extends DataResponse, TBody>(
  url: string,
  body: TBody
): Promise<HttpResponse<TResponse | any>> => {
  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    const resJson: HttpResponse<TResponse> = await res.json();

    return resJson;
  } catch (error) {
    return catchError(error);
  }
};

// ----------------------------------------------------------------------------

export const postDataFormDataApi = async <
  TResponse extends DataResponse,
  TBody extends Record<string, unknown>
>(
  url: string,
  body: TBody
): Promise<HttpResponse<TResponse | null>> => {
  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: getHeaders({ isFormData: true }),
      body: convertObjectToFormData(body),
    });

    const resJson: HttpResponse<TResponse> = await res.json();

    return resJson;
  } catch (error) {
    return catchError(error);
  }
};

// ----------------------------------------------------------------------------

export const getDataWithTokenApi = async <TResponse extends DataResponse>(
  url: string
): Promise<HttpResponse<TResponse | any>> => {
  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: "GET",
      headers: getHeaders({ authToken: await getAuthToken() }),
    });

    const resJson: HttpResponse<TResponse> = await res.json();

    return resJson;
  } catch (error) {
    return catchError(error);
  }
};

export const postDataWithTokenApi = async <
  TResponse extends DataResponse,
  TBody
>(
  url: string,
  body: TBody
): Promise<HttpResponse<TResponse | null>> => {
  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: getHeaders({ authToken: await getAuthToken() }),
      body: JSON.stringify(body),
    });

    const resJson: HttpResponse<TResponse> = await res.json();

    return resJson;
  } catch (error) {
    return catchError(error);
  }
};

export const putDataWithTokenApi = async <
  TResponse extends DataResponse,
  TBody
>(
  url: string,
  body: TBody
): Promise<HttpResponse<TResponse | null>> => {
  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: "PUT",
      headers: getHeaders({ authToken: await getAuthToken() }),
      body: JSON.stringify(body),
    });

    const resJson: HttpResponse<TResponse> = await res.json();

    return resJson;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteDataWithTokenApi = async <
  TResponse extends DataResponse,
  TBody
>(
  url: string,
  body?: TBody
): Promise<HttpResponse<TResponse | null>> => {
  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      headers: getHeaders({ authToken: await getAuthToken() }),
      body: body ? JSON.stringify(body) : null,
    });

    const resJson: HttpResponse<TResponse> = await res.json();

    return resJson;
  } catch (error) {
    return catchError(error);
  }
};

// ----------------------------------------------------------------------------

export const postDataTokenFormDataApi = async <
  TResponse extends DataResponse,
  TBody extends Record<string, any>
>(
  url: string,
  body: TBody
): Promise<HttpResponse<TResponse | null>> => {
  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: getHeaders({
        authToken: await getAuthToken(),
        isFormData: true,
      }),
      body: convertObjectToFormData(body),
    });

    const resJson: HttpResponse<TResponse> = await res.json();

    return resJson;
  } catch (error) {
    return catchError(error);
  }
};

export const putDataTokenFormDataApi = async <
  TResponse extends DataResponse,
  TBody extends Record<string, any>
>(
  url: string,
  body: TBody
): Promise<HttpResponse<TResponse | null>> => {
  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: "PUT",
      headers: getHeaders({
        authToken: await getAuthToken(),
        isFormData: true,
      }),
      body: convertObjectToFormData(body),
    });

    const resJson: HttpResponse<TResponse> = await res.json();

    return resJson;
  } catch (error) {
    return catchError(error);
  }
};
