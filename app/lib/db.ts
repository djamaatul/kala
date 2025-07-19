import { Pool, QueryResult, QueryResultRow } from "pg";

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
});

export type Query = <T extends QueryResultRow>(
  str: TemplateStringsArray,
  ...bind: any[]
) => Promise<QueryResult<T>>;

const query: Query = async <T extends QueryResultRow>(
  str: TemplateStringsArray,
  ...bind: any[]
) => {
  const variable: unknown[] = [];
  const query = str.reduce((acc, curr, i) => {
    let res = acc + curr;
    if (i < bind.length) {
      res += `$${i + 1}`;
      variable.push(bind[i] ?? null);
    }
    return res;
  }, "");

  const result = await db.query<T>(query, variable);

  return result;
};

export { db, query };
