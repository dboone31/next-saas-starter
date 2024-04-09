"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { users } from "@/drizzle/schema";

import { db } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";
import { eq } from "drizzle-orm";

export type FormData = {
  name: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const session = await auth();

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name } = userNameSchema.parse(data);

    // Update the user name.
    await db.update(users).set({ name }).where(eq(users.id, userId));

    revalidatePath("/dashboard/settings");
    return { status: "success" };
  } catch (error) {
    // console.log(error)
    return { status: "error" };
  }
}
