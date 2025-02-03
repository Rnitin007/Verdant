import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/plants",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/guide",
    "/guide/(.*)",
    "/api/public(.*)",
    "/sign-in",
    "/sign-up"
  ],
  // Routes that can be accessed by anyone, but have authentication data when logged in
  ignoredRoutes: [
    "/api/webhook/clerk"
  ]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 