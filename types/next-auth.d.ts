import NextAuth from "next-auth"

declare module "next-auth" {
     interface Session {
          user: {
               nama?: string | null | undefined;
               pegawaiId?: string;
               token?: string;
               username?: string;
               role?: string;
          } & DefaultSession["user"]
     }
}