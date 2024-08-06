export type IAppError = {
  errorType: string;
  message: string;
};

export interface APIError extends Error {
  data?: any;
}
