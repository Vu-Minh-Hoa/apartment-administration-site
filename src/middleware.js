import { NextResponse } from 'next/server'
import { UserAuth } from './context/AuthContext'

export default function middleware(request) {
  // const { user } = UserAuth()
  const user = true

  // protected routes
  if (request.nextUrl.pathname.startsWith('/user-management')) {
    if (!user) return NextResponse.redirect(new URL('/login', request.url))

    return NextResponse.next()
  }

  // public routes
  if (['/login', '/register'].includes(req.nextUrl.pathname)) {
    if (user) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    } else {
      return NextResponse.next()
    }
  }

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/tables']
}
