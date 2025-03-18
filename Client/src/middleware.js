import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-Saap-Portfolio-id", "d727dcfc-6f32-4ba6-b6e6-5147cbe5e22b");

  request.nextUrl.href = `https://www.saapportfolio.xyz/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}