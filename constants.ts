require("dotenv").config();

// Authentication
export const AUTH_TOKEN_SECRET =
  process.env.NODE_APP_AUTH_TOKEN_SECRET ?? "secret";
export const AUTH_TOKEN_EXP = process.env.NODE_APP_AUTH_TOKEN_EXP ?? "30d";
export const PASSWORD_ENCRYPTION_SALT_ROUNDS =
  parseInt(process.env.NODE_APP_PASSWORD_ENCRYPTION_SALT_ROUNDS!) ?? 10;

// Types
export type USER_TYPES = "master" | "student";
