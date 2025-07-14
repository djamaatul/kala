import { db } from "@/app/lib/db";

export async function GET() {
  await db.query(`
		truncate events;
		truncate users CASCADE;

		drop table events;
		drop table users ;

		INSERT INTO "users" ("id", "name", "password", "email", "created_at") VALUES
		('a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Alice', '$2b$10$OaMz7O8dnpbUMTC2vytK0eZAx5i9f0jvKpGmJS6oKpTZgU7QAKOAi', 'alice@example.com', CURRENT_TIMESTAMP);

		-- password: password456
		INSERT INTO "users" ("id", "name", "password", "email", "created_at") VALUES
		('8704322e-715d-452d-a1c4-6b8b7e5e0102', 'Bob', '$2b$10$uKMXMFZ/sHRQjD2BG.8rR.O6nQ7os3.MUuIT4QHhFhMn3zh2SlYMu', 'bob@example.com', CURRENT_TIMESTAMP);

		-- password: password789
		INSERT INTO "users" ("id", "name", "password", "email", "created_at") VALUES
		('82a281ff-beaf-4ba4-936b-7a63e0e23de4', 'Charlie', '$2b$10$OGehMvjNcfX44fB6iZYYEOk6xlKDjvO/nKMAK2n8F0shKaT1p0hXu', 'charlie@example.com', CURRENT_TIMESTAMP);

		-- Hari Libur Nasional Indonesia 2025
		-- Semua event dibuat public dengan shared_slug dan user dummy "system"

		INSERT INTO "events" (
			"id", "user_id", "title", "description",
			"start_time", "end_time", "visibility", "shared_slug", "created_at"
		) VALUES
		('holiday_20250101', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Hari Tahun Baru', 'Hari libur nasional', '2025-01-01 00:00:00', '2025-01-01 23:59:59', 'public', 'hari-tahun-baru', CURRENT_TIMESTAMP),
		('holiday_20250127', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Isra Mikraj Nabi Muhammad', 'Hari libur nasional', '2025-01-27 00:00:00', '2025-01-27 23:59:59', 'public', 'isra-mikraj', CURRENT_TIMESTAMP),
		('holiday_20250128', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Cuti Bersama Tahun Baru Imlek', 'Hari libur nasional', '2025-01-28 00:00:00', '2025-01-28 23:59:59', 'public', 'cuti-imlek', CURRENT_TIMESTAMP),
		('holiday_20250129', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Tahun Baru Imlek', 'Hari libur nasional', '2025-01-29 00:00:00', '2025-01-29 23:59:59', 'public', 'imlek', CURRENT_TIMESTAMP),
		('holiday_20250328', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Cuti Bersama Hari Suci Nyepi', 'Hari libur nasional', '2025-03-28 00:00:00', '2025-03-28 23:59:59', 'public', 'cuti-nyepi', CURRENT_TIMESTAMP),
		('holiday_20250329', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Hari Suci Nyepi', 'Hari libur nasional', '2025-03-29 00:00:00', '2025-03-29 23:59:59', 'public', 'nyepi', CURRENT_TIMESTAMP),
		('holiday_20250331', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Hari Idul Fitri (1)', 'Hari libur nasional', '2025-03-31 00:00:00', '2025-03-31 23:59:59', 'public', 'idulfitri-1', CURRENT_TIMESTAMP),
		('holiday_20250401', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Hari Idul Fitri (2)', 'Hari libur nasional', '2025-04-01 00:00:00', '2025-04-01 23:59:59', 'public', 'idulfitri-2', CURRENT_TIMESTAMP),
		('holiday_20250402', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Cuti Bersama Idul Fitri (1)', 'Hari libur nasional', '2025-04-02 00:00:00', '2025-04-02 23:59:59', 'public', 'cuti-idulfitri-1', CURRENT_TIMESTAMP),
		('holiday_20250403', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Cuti Bersama Idul Fitri (2)', 'Hari libur nasional', '2025-04-03 00:00:00', '2025-04-03 23:59:59', 'public', 'cuti-idulfitri-2', CURRENT_TIMESTAMP),
		('holiday_20250404', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Cuti Bersama Idul Fitri (3)', 'Hari libur nasional', '2025-04-04 00:00:00', '2025-04-04 23:59:59', 'public', 'cuti-idulfitri-3', CURRENT_TIMESTAMP),
		('holiday_20250407', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Cuti Bersama Idul Fitri (4)', 'Hari libur nasional', '2025-04-07 00:00:00', '2025-04-07 23:59:59', 'public', 'cuti-idulfitri-4', CURRENT_TIMESTAMP),
		('holiday_20250418', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Wafat Isa Almasih', 'Hari libur nasional', '2025-04-18 00:00:00', '2025-04-18 23:59:59', 'public', 'wafat-isa', CURRENT_TIMESTAMP),
		('holiday_20250420', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Hari Paskah', 'Hari libur nasional', '2025-04-20 00:00:00', '2025-04-20 23:59:59', 'public', 'paskah', CURRENT_TIMESTAMP),
		('holiday_20250501', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Hari Buruh Internasional', 'Hari libur nasional', '2025-05-01 00:00:00', '2025-05-01 23:59:59', 'public', 'hari-buruh', CURRENT_TIMESTAMP),
		('holiday_20250512', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Hari Raya Waisak', 'Hari libur nasional', '2025-05-12 00:00:00', '2025-05-12 23:59:59', 'public', 'waisak', CURRENT_TIMESTAMP),
		('holiday_20250513', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Cuti Bersama Waisak', 'Hari libur nasional', '2025-05-13 00:00:00', '2025-05-13 23:59:59', 'public', 'cuti-waisak', CURRENT_TIMESTAMP),
		('holiday_20250529', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Kenaikan Isa Al Masih', 'Hari libur nasional', '2025-05-29 00:00:00', '2025-05-29 23:59:59', 'public', 'kenaikan-isa', CURRENT_TIMESTAMP),
		('holiday_20250530', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Cuti Bersama Kenaikan Isa', 'Hari libur nasional', '2025-05-30 00:00:00', '2025-05-30 23:59:59', 'public', 'cuti-kenaikan-isa', CURRENT_TIMESTAMP),
		('holiday_20250601', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Hari Lahir Pancasila', 'Hari libur nasional', '2025-06-01 00:00:00', '2025-06-01 23:59:59', 'public', 'pancasila', CURRENT_TIMESTAMP),
		('holiday_20250609', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Idul Adha (Lebaran Haji)', 'Hari libur nasional', '2025-06-09 00:00:00', '2025-06-09 23:59:59', 'public', 'idul-adha', CURRENT_TIMESTAMP),
		('holiday_20250627', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Tahun Baru Hijriah', 'Hari libur nasional', '2025-06-27 00:00:00', '2025-06-27 23:59:59', 'public', 'muharram', CURRENT_TIMESTAMP),
		('holiday_20250817', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Hari Kemerdekaan RI', 'Hari libur nasional', '2025-08-17 00:00:00', '2025-08-17 23:59:59', 'public', 'kemerdekaan', CURRENT_TIMESTAMP),
		('holiday_20250905', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Maulid Nabi Muhammad', 'Hari libur nasional', '2025-09-05 00:00:00', '2025-09-05 23:59:59', 'public', 'maulid', CURRENT_TIMESTAMP),
		('holiday_20251225', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Hari Raya Natal', 'Hari libur nasional', '2025-12-25 00:00:00', '2025-12-25 23:59:59', 'public', 'natal', CURRENT_TIMESTAMP),
		('holiday_20251226', 'a16c5f2c-87c3-4ece-9c8c-ed5dd7a2a8c2', 'Cuti Bersama Natal', 'Hari libur nasional', '2025-12-26 00:00:00', '2025-12-26 23:59:59', 'public', 'cuti-natal', CURRENT_TIMESTAMP);
	`);
  return Response.json({
    status: "ok",
  });
}
