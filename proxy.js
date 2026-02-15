import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
export function proxy(request) {
  const { pathname } = request.nextUrl;
  if (pathname === "/" || pathname.startsWith("/Signup")) {
    return NextResponse.next()
  }
  const token = request.cookies.get("token")?.value;
  console.log(token)
  if(!token){
    return NextResponse.redirect(new URL("/",request.url))
  }
  try {
    jwt.verify(token,"thisismysecretkey")
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL("/",request.url))
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|map)$).*)",
  ],
};
