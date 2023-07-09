import env from "@/config/env";
import { jwtVerify } from "jose";

export async function verifiedToken(token) {
  try {
    const decode = await jwtVerify(
      token,
      new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
    );
    return decode.payload;
  } catch (err) {
    console.log("Your token has expired.");
  }
}
