import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // function middleware(req) {
  //   // const role = req.nextauth.token?.role === "user";
  //   // return NextResponse.json(role);
  //   // if (
  //   //   req.nextUrl.pathname.startsWith("/dashboard") &&
  //   //   req.nextauth.token?.role !== "admin"
  //   // )
  // },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/diklat/:path*",
    "/perencanaan/:path*",
    "/informasi/:path*",
  ],
};
