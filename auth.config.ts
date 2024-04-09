// import Google from "next-auth/providers/google"
// import { env } from "@/env.mjs"

import type { NextAuthConfig } from "next-auth"
import { sendVerificationRequest } from "./utils/send-verification-reqest"
import Nodemailer from "@auth/core/providers/nodemailer"

export default {
  providers: [
    // Google({
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET,
    // }),
    Nodemailer({
      name: 'email',
      server: '',
      from: 'david@blendedcourse.com',
      sendVerificationRequest,
    })
  ],
} satisfies NextAuthConfig