export type DataResponse = Record<string, any> | Record<string, any>[] | null;

interface Paginate<T> {
  rows?: T; // Rows of Data
  limit: number;
  page: number;
  total_rows: number;
  total_pages: number;
}

export interface HttpResponse<T> {
  details: {
    path: string;
    query: string;
    status_code: number;
    method: string;
  };
  valid: boolean;
  data: T;
  errors: { [k: string]: [string] } | null;
  message: string;
}

export interface HttpResponsePaginate<T> {
  details: {
    path: string;
    query: string;
    status_code: number;
    method: string;
  };
  valid: boolean;
  data: Paginate<T> | null;
  errors: { [k: string]: [string] } | null;
  message: string;
}

export interface ResponseUsecase<T> {
  valid: boolean;
  message: string;
  data?: T;
}

export interface ResponseUseCasePaginate<T> {
  valid: boolean;
  message: string;
  data?: Paginate<T>;
}

export interface ErrorResponse {
  valid: boolean;
  message: string;
}
