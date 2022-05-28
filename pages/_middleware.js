import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import absoluteUrl from 'next-absolute-url'

export async function middleware(req) {
    // Token will exist if user is logged in
    const token = await getToken({req, secret: process.env.JWT_SECRET });
    
    const {pathname} = req.nextUrl;
    const {origin} = absoluteUrl(req)

    if(pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    } 
    if(!token && pathname !== '/login'){
        return NextResponse.redirect(`${origin}/login`)
    }
    

}