import { db } from "@/app/lib/db";

export async function GET() {
  await db.query(`
    INSERT INTO "users" ("id", "name", "password", "email", "created_at") VALUES
    ('user_001', 'Alice', 'password123', 'alice@example.com', CURRENT_TIMESTAMP),
    ('user_002', 'Bob', 'password456', 'bob@example.com', CURRENT_TIMESTAMP),
    ('user_003', 'Charlie', 'password789', 'charlie@example.com', CURRENT_TIMESTAMP);
    
    INSERT INTO "events" ("id", "user_id", "title", "description", "start_time", "end_time", "visibility", "shared_slug", "created_at") VALUES
    ('event_001', 'user_001', 'Alice Birthday', 'Alice’s birthday celebration.', '2025-07-15 10:00:00', '2025-07-15 14:00:00', 'public', 'alice-birthday', CURRENT_TIMESTAMP),
    ('event_002', 'user_002', 'Bob’s Meeting', 'Team strategy session.', '2025-07-16 09:00:00', '2025-07-16 11:00:00', 'private', NULL, CURRENT_TIMESTAMP),
    ('event_003', 'user_003', 'Charlie’s Workshop', 'JavaScript for beginners.', '2025-07-17 13:00:00', '2025-07-17 16:00:00', 'shared', 'js-workshop-charlie', CURRENT_TIMESTAMP);
    `);
  return Response.json({
    status: "ok",
  });
}
