import { cleanEnv, str, bool } from 'envalid';

const env = cleanEnv(process.env, {
  AZURE_AUTHORITY: str(),
  AZURE_TENANT_ID: str(),
  AZURE_VERSION: str(),
  AZURE_DISCOVERY: str(),
  AZURE_CLIENT_ID: str(),
  AZURE_VALIDATE_ISSUER: bool(),
  AZURE_PASS_REQ_TO_CALLBACK: bool(),
  AZURE_LOGGING_LVL: str(),
});

export const azureConfig = {
  identityMetadata: `https://${env.AZURE_AUTHORITY}/${env.AZURE_TENANT_ID}/${env.AZURE_VERSION}/${env.AZURE_DISCOVERY}`,
  issuer: `https://${env.AZURE_AUTHORITY}/${env.AZURE_TENANT_ID}/${env.AZURE_VERSION}`,
  clientID: env.AZURE_CLIENT_ID,
  audience: env.AZURE_CLIENT_ID,
  validateIssuer: env.AZURE_VALIDATE_ISSUER,
  passReqToCallback: env.AZURE_PASS_REQ_TO_CALLBACK,
  loggingLevel: env.AZURE_LOGGING_LVL,
};
