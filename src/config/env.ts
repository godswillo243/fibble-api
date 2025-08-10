import dotenv from "dotenv";
dotenv.config({ quiet: true });
export const {
  CLIENT_URL,
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  SMTP_EMAIL,
  SMTP_PASSWORD,
} = process.env;
