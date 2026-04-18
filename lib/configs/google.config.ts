export type GoogleConfig = {
  clientId: string;
  clientSecret: string;
};

let cachedGoogleConfig: GoogleConfig | null = null;

function readRequiredEnv(name: "GOOGLE_CLIENT_ID" | "GOOGLE_CLIENT_SECRET") {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`[googleConfig] Missing required environment variable: ${name}.`);
  }

  return value;
}

function validateGoogleClientId(clientId: string) {
  if (!clientId.endsWith(".apps.googleusercontent.com")) {
    throw new Error(
      "[googleConfig] GOOGLE_CLIENT_ID must be a valid Google OAuth client ID ending with .apps.googleusercontent.com."
    );
  }
}

function validateGoogleClientSecret(clientSecret: string) {
  if (clientSecret.length < 20) {
    throw new Error(
      "[googleConfig] GOOGLE_CLIENT_SECRET looks too short. Check your Google OAuth credentials."
    );
  }
}

export function googleConfig(): GoogleConfig {
  if (cachedGoogleConfig) {
    return cachedGoogleConfig;
  }

  const clientId = readRequiredEnv("GOOGLE_CLIENT_ID");
  const clientSecret = readRequiredEnv("GOOGLE_CLIENT_SECRET");

  validateGoogleClientId(clientId);
  validateGoogleClientSecret(clientSecret);

  cachedGoogleConfig = {
    clientId,
    clientSecret,
  };

  return cachedGoogleConfig;
}
