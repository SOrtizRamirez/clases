import users from "../data/users.json" with { type: "json" };
import type { IUser } from "../interfaces/user.interface.ts";

export async function getUserByMailService(mail: string): Promise<IUser | null> {
    const user = users.find((u) => u.email === mail);
    return user || null;
}