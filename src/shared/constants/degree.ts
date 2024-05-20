import { z } from 'zod';

export enum Degree {
  BACHELOR = 'Bachelor',
  MASTER = 'Master',
}

export const degreSchema = z.union([z.literal(Degree.BACHELOR), z.literal(Degree.MASTER)]);
