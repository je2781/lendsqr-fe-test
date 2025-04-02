import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const isAuth = request.cookies.get("is_auth")?.value
  //   return NextResponse.redirect(new URL('/home', request.url))
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ;


  if (isPublicPath && Boolean(isAuth)) {
    return NextResponse.redirect(new URL("/", request.nextUrl), {
      status: 302,
    });
  }

  if (!isPublicPath && !Boolean(isAuth)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl), {
      status: 302,
    });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/users",
    "/users/:id*"
  ],
};
