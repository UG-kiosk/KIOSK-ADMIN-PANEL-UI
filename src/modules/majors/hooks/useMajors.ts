import { useCallback, useState } from 'react';
import { CreateMajorRequest } from '../types/createMajorRequest';
import axios from 'axios';
import { environment } from '../../../environments/environment';

export const useMajors = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const createMajors = useCallback(async (majors: CreateMajorRequest[]) => {
    try {
      setIsLoading(true);
      await axios.post(environment.KIOSK_API_URL + '/majors', majors);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(true);
      setError(error);
    }
  }, []);

  return { createMajors, isLoading, error };
};
