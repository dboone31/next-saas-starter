import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      columns: {
        name: true,
        emailVerified: true,
      },
      where: eq(users.email, email),
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    return user;
  } catch {
    return null;
  }
};
