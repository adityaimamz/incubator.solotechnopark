import { NextResponse } from "next/server";
import { verifiedToken } from "./utils/verifiedToken";

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const decode =
    token && (await verifiedToken(token).catch((err) => console.log(err)));

  if (req.url.includes("/login") && decode) {
    // return NextResponse.redirect(new URL("/admin/dashboard"));
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (req.url.includes("/admin") && !decode) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
