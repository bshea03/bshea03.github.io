import { expressjwt } from "express-jwt";
import type { RequestHandler } from "express";

const { ACCESS_TOKEN_SECRET } = process.env;
if (!ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET is not set");
}

export const authMiddleware: RequestHandler = expressjwt({
  secret: ACCESS_TOKEN_SECRET,
  algorithms: ["HS256"],
});
