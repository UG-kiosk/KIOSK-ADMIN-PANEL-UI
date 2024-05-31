import { z } from 'zod';

export const sortDirectionSchema = z.union([z.literal('Asc'), z.literal('Dsc')]);
export type SortDirection = z.infer<typeof sortDirectionSchema>;
