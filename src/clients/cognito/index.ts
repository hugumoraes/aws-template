/* ---------- External ---------- */
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';

/* ---------- Client ---------- */
export const cognito_client = new CognitoIdentityProviderClient({});
