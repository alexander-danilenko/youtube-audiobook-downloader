import { z } from 'zod';

export const bookDtoSchema = z.object({
  id: z.string().min(1, 'validation_id_required'),
  url: z
    .string()
    .min(1, 'validation_url_required')
    .refine(
      (url) => {
        const trimmed = url.trim();
        if (!trimmed) return false;
        const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i;
        return youtubePattern.test(trimmed);
      },
      { message: 'validation_url_invalid' }
    ),
  title: z.string().min(1, 'validation_title_required').refine((val) => val.trim().length > 0, {
    message: 'validation_title_empty',
  }),
  author: z.string().min(1, 'validation_author_required').refine((val) => val.trim().length > 0, {
    message: 'validation_author_empty',
  }),
  narrator: z.string().optional(),
  series: z.string().optional(),
  seriesNumber: z.number().int().min(1, 'validation_series_number_min'),
  year: z
    .number()
    .int()
    .min(1000, 'validation_year_min')
    .max(9999, 'validation_year_max')
    .optional(),
});

export type BookDto = z.infer<typeof bookDtoSchema>;

export const bookDtoArraySchema = z.array(bookDtoSchema);
