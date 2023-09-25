/* ---------- External ---------- */
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

/* ---------- Interfaces ---------- */
interface HandleHttpResponse {
  status_code: number;
  body: { [key: string]: unknown };
}

/* ---------- Function ---------- */
const handle_http_response = ({
  body,
  status_code,
}: HandleHttpResponse): APIGatewayProxyStructuredResultV2 =>
  ({
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Headers': 'Authorization',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    statusCode: status_code,
  } as APIGatewayProxyStructuredResultV2);

export { handle_http_response };
