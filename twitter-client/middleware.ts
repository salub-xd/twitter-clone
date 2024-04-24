// import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// import {
//     DEFAULT_LOGIN_REDIRECT,
//     apiAuthPrefix,
//     authRoutes,
//     publicRoutes
// } from '@/routes';

export function middleware(request: NextRequest) {

//     const { nextUrl } = request;
//     let cookie = request.cookies.get("twitter-token")?.value;
//     console.log(cookie);

//     // const user = localStorage.getItem("twitter-token");
//     // if (!user) {
//     //     return Response.redirect(new URL('/login', nextUrl));
//     // }
//     // if(user)

//     const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//     const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//     const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//     if (isApiAuthRoute) {
//         return;
//     }

//     if (isAuthRoute) {
//         if (cookie) {
//             return NextResponse.redirect(new URL('/home', nextUrl));
//         }
//         return;
//     }

//     if (!cookie && !isPublicRoute) {
//         return NextResponse.redirect(new URL('/', nextUrl));
//     }

//     return;

}

// // Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}