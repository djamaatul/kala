import bcrypt from "bcrypt";
import { Pagination } from "../types/pagintion";
import { Query } from "../lib/db";

export type User = {
  id: string;
  name: string;
  password: string;
  email: string;
  created_at: string;
};

export default class Users {
  db: Query;
  constructor(db: Query) {
    this.db = db;
  }
  getUser(id: string) {
    return this.db`
      select
      "id",
	    "name",
	    "password",
	    "email",
			to_char("created_at", 'YYYY-MM-DD HH:mi:ss') as "created_at"
     from 
        users
      where id = ${id} 
    `;
  }

  getUsers({ page = 1, record = 10 }: Pagination) {
    return this.db`
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
  }

  async changePasswordUser(user_id: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.db`
      update users
      set password = ${hashedPassword}
      where id = ${user_id} 
    `;
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async createUser(user: Omit<User, "createdAt" | "id">) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.db`
      insert into users (
	    "name",
	    "password",
	    "email",
			"created_at"
			) values (
			  ${user.name},
				${hashedPassword},
				${user.email},
  			to_date(NOW(), 'YYYY-MM-DD HH:mi:ss')
			)
    `;
  }

  async deleteUser(user: Pick<User, "id" | "email">) {
    return this.db`
      DELETE USERS WHERE ID = ${user.id} OR EMAIL = ${user.email}
    `;
  }
}
