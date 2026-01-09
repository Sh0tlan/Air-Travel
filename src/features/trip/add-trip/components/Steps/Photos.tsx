import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@config/routes';
import FilesForm from '@features/trip/components/Files/FilesForm';
import { useAddTripMutation } from '@features/trip/store/tripsApi';
import { TripFile } from '@features/trip/types';
import { useAppDispatch, useAppSelector } from '@store/index';

import {
  resetWizard,
  selectWizardTrip,
  setPhotos,
} from '../../store/tripWizardSlice';
import Pagination from '../Navigation/Pagination';

export default function Photos() {
  const { photos, onSubmit, onChange, isLoading } = usePhotosForm();

  return (
    <FilesForm
      defaultFiles={photos}
      onSubmit={onSubmit}
      SubmitComponent={<Pagination isLoading={isLoading} />}
      onChange={onChange}
      type={'photo'}
    />
  );
}

function usePhotosForm() {
  const [addTrip, { isLoading }] = useAddTripMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit = async (data: TripFile[]) => {
    if (isLoading) {
      return;
    }

    dispatch(setPhotos(data));

    const result = await addTrip({
      ...trip,
      photos: data,
    });

    if (!('error' in result)) {
      navigate(AppRoutes.trips);
      dispatch(resetWizard());
    }

    navigate(AppRoutes.trips);
    dispatch(resetWizard());
  };

  const onChange = (data: TripFile[]) => {
    dispatch(setPhotos(data));
  };

  return {
    photos: trip.photos,
    onSubmit,
    onChange,
    isLoading,
  };
}
