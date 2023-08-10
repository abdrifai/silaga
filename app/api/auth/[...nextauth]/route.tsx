import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const Url = process.env.URL_BACKEND;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req: any) {
        const { username, password } = credentials as any;

        const res = await fetch(`${Url}/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const user = await res.json();
        // console.log(user);

        if (user) {
          return user.data;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    // async signIn({ user }) {
    //   const isAdmin = user?.role === "admin";
    //   console.log(isAdmin);
    //   if (isAdmin) {
    //     return "/dashboard";
    //   } else {
    //     return "/profile";
    //   }
    // },
  },

  pages: {
    signIn: "/signin",
    error: "/error",
  },
});

export { handler as GET, handler as POST };
