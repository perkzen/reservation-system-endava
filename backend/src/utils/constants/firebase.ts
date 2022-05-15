import * as serviceAccount from '../../../firebase-service-account.json';

const firebaseServiceAccount = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CerUrl: serviceAccount.auth_provider_x509_cert_url,
  clientX509CerUrl: serviceAccount.auth_provider_x509_cert_url,
};

export default firebaseServiceAccount;
