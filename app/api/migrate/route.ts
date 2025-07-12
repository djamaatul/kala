import { db } from "@/app/lib/db";

export async function GET() {
  await db.query(`
			CREATE table if not exists "users" (
					"id" VARCHAR(32) NOT NULL,
					"name" VARCHAR(32),
					"password" VARCHAR(32),
					"email" VARCHAR(32) NOT NULL,
					"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
					CONSTRAINT "pk_users" PRIMARY KEY ("id")
			);

			drop index if exists uq_user_email;
			create UNIQUE INDEX uq_user_email ON "users"("email");
			
			CREATE TABLE if not exists "events" (
					"id" VARCHAR(32) NOT NULL,
					"user_id" VARCHAR(32) NOT NULL,
					"title" TEXT NOT NULL,
					"description" TEXT,
					"start_time" TIMESTAMP(3) NOT NULL,
					"end_time" TIMESTAMP(3) NOT NULL,
					"visibility" VARCHAR(32) NOT NULL DEFAULT 'private',
					"shared_slug" VARCHAR(32),
					"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
					CONSTRAINT "pk_events" PRIMARY KEY ("id")
			);

			drop index if exists uq_event_public_slug;
			create UNIQUE INDEX "uq_event_public_slug" ON "events"("public_slug");
			
			drop index if exists uq_event_shared_slug;
			create UNIQUE INDEX "uq_event_shared_slug" ON "events"("shared_slug");
			
			alter table events drop constraint if exists fk_user_events;
			ALTER TABLE "events" ADD CONSTRAINT "fk_user_events" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
	`);

  return Response.json({
    status: "ok",
  });
}
