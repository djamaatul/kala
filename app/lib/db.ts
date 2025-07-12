import { Pool, QueryArrayResult, QueryResultRow } from "pg";

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
});

db.connect();

export type Query = <T extends any[]>(
  str: TemplateStringsArray,
  ...bind: any[]
) => Promise<QueryArrayResult<T>>;

const query: Query = async <T extends QueryResultRow>(
  str: TemplateStringsArray,
  ...bind: any[]
) => {
  const variable: unknown[] = [];
  const query = str.reduce((acc, curr, i) => {
    let res = acc + curr;
    if (bind[i]) {
      res += `$${i + 1}`;
      variable.push(bind[i]);
    }
    return res;
  }, "");
  const result = await db.query<T>(query, variable);
  await db.end();
  return result;
};

export { db, query };
