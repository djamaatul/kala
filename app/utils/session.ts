import { getServerSession } from "next-auth";
import UsersRepository from "../repositories/users";

export async function getSession() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;

  const userInfo = await UsersRepository.getUser({
    email: session.user.email,
  });

  return {
    ...session.user,
    ...userInfo,
  };
}
