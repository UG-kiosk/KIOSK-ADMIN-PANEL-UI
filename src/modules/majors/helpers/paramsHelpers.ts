import { Degree, degreSchema } from '../../../shared/constants/degree';

export const isDegree = (degree?: string): Degree | undefined => {
  const parsedDegree = degreSchema.safeParse(degree);
  return parsedDegree.success ? parsedDegree.data : undefined;
};
