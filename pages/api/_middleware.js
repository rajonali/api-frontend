import { NextResponse, NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import absoluteUrl from 'next-absolute-url'


const secret = process.env.secret;

export default function middleware(req) {
    const { cookies } = req;

    const jwt = cookies.token;
    const { origin } = absoluteUrl(req)

    const loginurl = req.nextUrl.clone()
    loginurl.pathname = `${origin}/login`
    const { pathname } = req.nextUrl;

    const url = JSON.stringify(req.nextUrl)
    console.log("my url"+JSON.stringify(pathname))
    /*
    if(pathname.includes('/posts')){
        if(jwt === undefined) {
            
            NextResponse.rewrite(`${origin}/login`);

        }
        try {
            verify(jwt, secret);

            return NextResponse.next()
        } catch {
            NextResponse.rewrite(loginurl)
        }
    }
    */
    return NextResponse.next();
}