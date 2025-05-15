import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/auth/login(.*)",
    "/auth/register(.*)",
    "/mock-tests",
    "/mock-tests/1",
    "/mock-tests/2",
    "/mock-tests/3",
    "/pricing/premium",
  ]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 