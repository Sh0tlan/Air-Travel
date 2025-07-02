import FilesForm from '@features/trip/components/Files/FilesForm';
import { TripFile } from '@features/trip/types';
import { useAppDispatch, useAppSelector } from '@store/index';

import {
  nextStep,
  selectWizardTrip,
  setDocuments,
} from '../../store/tripWizardSlice';
import Pagination from '../Navigation/Pagination';

export default function Documents() {
  const { documents, onSubmit } = useDocumentsForm();

  return (
    <FilesForm
      defaultFiles={documents}
      onSubmit={onSubmit}
      SubmitComponent={<Pagination />}
    />
  );
}

function useDocumentsForm() {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit = (data: TripFile[]) => {
    dispatch(setDocuments(data));
    dispatch(nextStep());
  };

  return {
    documents: trip.documents,
    onSubmit,
  };
}
