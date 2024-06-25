import { useCallback, useState } from 'react';
import { MajorScraperResponseDto } from '../../types/major';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

export const useScrapeMajors = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrapeMajors = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data: scraperdMajors } = await axios.get<MajorScraperResponseDto[]>(
        // url will be changed to KIOSK_API_URL
        environment.SCRAPERS_API_URL + '/scrape/majors',
      );
      setIsLoading(false);

      return scraperdMajors;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  }, []);

  return { scrapeMajors, isLoading, error };
};
