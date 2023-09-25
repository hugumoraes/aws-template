interface HandleHttpError {
  code?: string;
  message: string;
  status_code: number;
}

const handle_http_error = ({
  message,
  status_code,
  code,
}: HandleHttpError): string =>
  JSON.stringify({
    message,
    status_code,
    code,
  });

export { handle_http_error };
