import { useCallback, useEffect } from 'react';
import { useScrapeMajors } from './hooks';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CreateScrapedMajorsFormTypes } from './types/createScrapedMajorsFormTypes';
import { useMajors } from '../hooks/useMajors';
import { CreateMajorRequest } from '../types/createMajorRequest';
import { createStyles } from '../../../theme/utils';
import Button from '../../../components/Button/Button';

export const MajorsScraperPage = () => {
  const { scrapeMajors, isLoading: isLoadingScraper, error: scraperError } = useScrapeMajors();
  const { createMajors } = useMajors();
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
      await createMajors(majors as unknown as CreateMajorRequest[]);
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
        <textarea css={scraperPageStyles.textarea} {...formMethods.register('majors')}></textarea>
        <Button label="Submit" type="submit" />
      </form>
    </FormProvider>
  );
};

const scraperPageStyles = createStyles({
  textarea: () => ({
    width: '100%',
    minHeight: 300,
  }),
});
