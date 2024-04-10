import Google from "next-auth/providers/google"
import { env } from "@/env.mjs"

import type { NextAuthConfig } from "next-auth";
import EmailProvider from "next-auth/providers/resend";

import { sendVerificationRequest } from "./utils/send-verification-reqest";

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // EmailProvider({
    //   name: "email",
    //   server: "",
    //   from: "david@blendedcourse.com",
    //   sendVerificationRequest,
    // }),
  ],
} satisfies NextAuthConfig;
