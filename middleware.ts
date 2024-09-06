import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a route matcher for the `/admin/*` route
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  // Check if the route is a protected route (e.g., /admin)
  if (!auth().userId && isProtectedRoute(req)) {
    // Redirect unauthenticated users to the sign-in page
    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Protect the /admin/* route
    "/admin/(.*)",
    // Optionally protect API routes or other dynamic routes
    "/(api|trpc)(.*)",
  ],
};
