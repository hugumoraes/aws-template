/* ---------- External ---------- */
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

/* ---------- Helpers ---------- */
import { handle_http_response } from '__utils/handle-http-response';

/* ---------- Interfaces ---------- */
interface HandleHttpErrorResponse {
  error: unknown;
}

const handle_http_error_response = ({
  error,
}: HandleHttpErrorResponse): APIGatewayProxyStructuredResultV2 => {
  if (error instanceof Error)
    try {
      const parsed_error = JSON.parse(error.message);

      return handle_http_response({
        status_code: parsed_error.status_code,
        body: { message: parsed_error.message },
      });
    } catch {
      return handle_http_response({
        body: { message: error.message },
        status_code: 400,
      });
    }

  return handle_http_response({
    body: { message: 'Unknown error' },
    status_code: 400,
  });
};

export { handle_http_error_response };
