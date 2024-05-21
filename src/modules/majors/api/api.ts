import { environment } from '../../../environment';
import { HTTP_METHOD } from '../../../shared/constants/httpMethods';
import { CreateMajorRequestDto } from '../types/major';

export const createMajorCall = async (body: CreateMajorRequestDto[]): Promise<CreateMajorRequestDto> => {
  const createMajorUrl = new URL(environment.KIOSK_API_URL + '/majors');

  const response = await fetch(createMajorUrl, {
    method: HTTP_METHOD.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`[createMajorsUrl]: ${response.status}. ${response.statusText}.`);
  }

  const data = await response.json();

  return data;
};
