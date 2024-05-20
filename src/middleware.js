import { NextResponse } from 'next/server'

export default function middleware(request) {
  const user = ''

  return NextResponse.redirect(new URL('/', request.url))
  if (!user) {
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/tables']
}
