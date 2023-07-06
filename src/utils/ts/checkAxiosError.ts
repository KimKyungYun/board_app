import axios, { AxiosError } from "axios";

interface ServerErrorResponse {
  message: string;
}

// eslint-disable-next-line arrow-body-style
const checkAxiosErrorMessage = (
  error: any
): error is AxiosError<ServerErrorResponse> => {
  return "message" in error.response.data && axios.isAxiosError(error);
};

export default checkAxiosErrorMessage;
