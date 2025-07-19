import UsersRepository from "../repositories/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const userInfo = await UsersRepository.getUser({
    email: session.user.email,
  });

  return {
    ...session.user,
    ...userInfo,
  };
}
