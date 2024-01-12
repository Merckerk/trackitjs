export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/track",
    "/add",
    "/edit-expense/:path",
  ],
};