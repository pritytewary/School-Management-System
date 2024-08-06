import { APIError } from "../error";

export interface BaseApiRequestProps {
  url: string;
  data?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  signal?: AbortSignal | null;
  params?: any;
  headers?: any;
}

export const baseApiRequest = async ({
  url,
  data = null,
  method = "GET",
  signal = null,
  params = null,
  headers = {},
}: BaseApiRequestProps) => {
  try {
    const uParams = params ? new URLSearchParams(params).toString() : "";

    console.debug("API Request", {
      url: `/api${url}`,
      method,
      params: uParams,
      data,
    });

    const response = await fetch(`/api${url}?${uParams}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      signal,
    });

    if (!response.ok) {
      const text = await response.text();
      let data: APIError;

      try {
        const json = JSON.parse(text);

        data = {
          message: json.message,
          name: json.type,
          data: json,
        };
      } catch (_) {
        data = {
          message: `Request failed with status ${
            response.status
          } and message ${text.slice(0, 100)}`,
          name: "InternalServerError",
          data: { text, status: response.status },
        };
      }

      const e = new Error(data.message) as APIError;
      e.name = data.name;
      e.data = data.data;
      throw e;
    }

    const result = await response.json();
    return result as any;
  } catch (error) {
    console.error("API Error", error);

    const errorType = (error as Error).name || "InternalServerError";
    const errorMessage = (error as Error).message;
    const rawData = (error as APIError)?.data || {};

    const e = new Error(errorMessage) as APIError;
    e.name = errorType;
    e.data = rawData || {};

    throw e;
  }
};
