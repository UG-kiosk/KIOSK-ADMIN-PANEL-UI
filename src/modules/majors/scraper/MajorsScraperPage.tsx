import { useCallback, useEffect } from 'react';
import { useScrapeMajors } from './hooks';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CreateScrapedMajorsFormTypes } from './types/createScrapedMajorsFormTypes';
import { useMajors } from '../hooks/useMajors';

export const MajorsScraperPage = () => {
  const { scrapeMajors, isLoading: isLoadingScraper, error: scraperError } = useScrapeMajors();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createMajors, isLoading: isLoadingCreate, error: createError } = useMajors();
  const formMethods = useForm<CreateScrapedMajorsFormTypes>({
    defaultValues: { majors: '' },
  });

  const updateMajorsForm = useCallback(async () => {
    try {
      const scrapedMajors = await scrapeMajors();
      formMethods.setValue('majors', JSON.stringify(scrapedMajors, undefined, 4));
    } catch (error) {
      console.error(error);
    }
  }, [formMethods, scrapeMajors]);

  useEffect(() => {
    updateMajorsForm();
  }, [updateMajorsForm]);

  const onSubmit: SubmitHandler<CreateScrapedMajorsFormTypes> = useCallback(
    async ({ majors }: CreateScrapedMajorsFormTypes) => {
      console.log(majors);
      await createMajors(majors as CreateMajorRequest[]);
      console.log('Majors created');
    },
    [createMajors],
  );

  if (isLoadingScraper) {
    return <div>Scraping majors</div>;
  }

  if (scraperError) {
    return <div>Error while scraping majors</div>;
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <textarea {...formMethods.register('majors')}></textarea>
      </form>
    </FormProvider>
  );
};
