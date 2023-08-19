import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname.includes('/admin') && token?.role !== 'admin') {
        return false;
      }
      return true;
    },
  },
});

export const config = { matcher: ['/admin', '/admin/:slug*'] };
