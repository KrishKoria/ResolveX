import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isOrgFreeRoute = createRouteMatcher([
  "/org-select(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);
export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  if (userId && !isOrgFreeRoute(req) && !orgId) {
    const searchParams = new URLSearchParams({ redirectTo: req.url });
    const orgSelect = new URL(
      `/org-select?${searchParams.toString()}`,
      req.url
    );
    return NextResponse.redirect(orgSelect);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
