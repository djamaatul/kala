import bcrypt from "bcrypt";
import { Pagination } from "../types/pagintion";
import { query } from "../lib/db";
import { v4 } from "uuid";

export type User = {
  id: string;
  name?: string;
  password: string;
  email: string;
  created_at: string;
};

export default class UsersRepository {
  static async getUser(user: Partial<Pick<User, "id" | "email">>) {
    const data = await query<User>`
      select
      "id",
	    "name",
	    "password",
	    "email",
			to_char("created_at", 'YYYY-MM-DD HH:mi:ss') as "created_at"
     from 
        users
      where ID = ${user.id} OR EMAIL = ${user.email}`;
    return data.rows[0];
  }

  static async getUsers({ page = 1, record = 10 }: Pagination) {
    const users = await query`
      select
      "id",
	    "name",
	    "password",
	    "email",
			to_char("created_at", 'YYYY-MM-DD HH:mi:ss') as "created_at"
     from 
        users
      order by "created_at" desc
      offset ${(page - 1) * record} rows fetch first ${record} rows only
    `;
    return users.rows;
  }

  static async changePasswordUser(user_id: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return query`
      update users
      set password = ${hashedPassword}
      where id = ${user_id} 
    `;
  }

  static async verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  static async createUser(user: Omit<User, "created_at" | "id">) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return query`
      insert into users (
      "id",
	    "name",
	    "password",
	    "email",
			"created_at"
			) values (
			  ${v4()},
			  ${user.name},
				${hashedPassword},
				${user.email},
  			NOW()
			)
    `;
  }

  static async deleteUser(user: Pick<User, "id" | "email">) {
    return query`
      DELETE USERS WHERE ID = ${user.id} OR EMAIL = ${user.email}
    `;
  }
}
