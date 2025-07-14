import z from "zod";

const formatDarteZod = z
  .string()
  .regex(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/, "must be format YYYY-MM-DD HH:mm");

export const getEventDto = z.object({
  query: z.string().default(""),
  page: z.number().default(1),
  record: z.number().optional().default(5),
  order: z.enum(["desc", "asc"]).default("desc"),
});

export const saveEventDto = z.object({
  user_id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  start_time: formatDarteZod,
  end_time: formatDarteZod,
  visibility: z.enum(["public", "private", "shared"]),
  shared_slug: z.string().optional(),
});

export const updateEventDto = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  start_time: formatDarteZod,
  end_time: formatDarteZod,
  visibility: z.enum(["public", "private", "shared"]),
  shared_slug: z.string().optional(),
});

export const deleteEventDto = z.object({
  id: z.string(),
});
