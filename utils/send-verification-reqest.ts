import MagicLinkEmail from "@/emails/magic-link-email";
import { siteConfig } from "@/config/site";
import { resend } from "@/lib/email";
import { getUserByEmail } from "@/lib/user";


export async function sendVerificationRequest({ identifier, url }) {
  const user = await getUserByEmail(identifier);
  if (!user || !user.name) {
    throw new Error("User not found or user name is not defined");
  }

  const userVerified = user?.emailVerified ? true : false;
  const authSubject = userVerified
    ? `Sign-in link for ${siteConfig.name}`
    : "Activate your account";

  try {
    const { data, error } = await resend.emails.send({
      from: "SaaS Starter App <onboarding@resend.dev>",
      to:
        process.env.NODE_ENV === "development"
          ? "delivered@resend.dev"
          : identifier,
      subject: authSubject,
      react: MagicLinkEmail({
        firstName: user?.name as string,
        actionUrl: url,
        mailType: userVerified ? "login" : "register",
        siteName: siteConfig.name,
      }),
      // Set this to prevent Gmail from threading emails.
      // More info: https://resend.com/changelog/custom-email-headers
      headers: {
        "X-Entity-Ref-ID": new Date().getTime() + "",
      },
    });

    if (error || !data) {
      throw new Error(error?.message);
    }

    // console.log(data)
  } catch (error) {
    throw new Error("Failed to send verification email.");
  }
}
