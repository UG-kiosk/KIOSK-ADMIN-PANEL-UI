import { Degree, degreSchema } from '../../../../shared/constants/degree';
import { SortDirection, sortDirectionSchema } from '../../types/sort';

export const setSort = (sortDirection: SortDirection) => (sortDirection === 'Asc' ? 'Dsc' : 'Asc');

export const isSort = (sortDirection: string) => {
  const parsedSortDirection = sortDirectionSchema.safeParse(sortDirection);
  return parsedSortDirection.success ? parsedSortDirection.data : 'Asc';
};

export const isDegree = (degree: string) => {
  const parsedDegree = degreSchema.safeParse(degree);
  return parsedDegree.success ? parsedDegree.data : Degree.BACHELOR;
};

export const setDegree = (degree: Degree) => (degree === Degree.BACHELOR ? Degree.BACHELOR : Degree.MASTER);
