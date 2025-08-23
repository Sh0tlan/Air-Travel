import FilesForm from '@features/trip/components/Files/FilesForm';
import { TripFile } from '@features/trip/types';
import { addTrip } from '@services/api/trip';
import { useAppDispatch, useAppSelector } from '@store/index';

import { selectWizardTrip, setPhotos } from '../../store/tripWizardSlice';
import Pagination from '../Navigation/Pagination';

export default function Photos() {
  const { photos, onSubmit, onChange } = usePhotosForm();

  return (
    <FilesForm
      defaultFiles={photos}
      onSubmit={onSubmit}
      SubmitComponent={<Pagination />}
      onChange={onChange}
      type={'photo'}
    />
  );
}

function usePhotosForm() {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit = async (data: TripFile[]) => {
    dispatch(setPhotos(data));

    await addTrip({
      ...trip,
      photos: data,
    });
  };

  const onChange = (data: TripFile[]) => {
    dispatch(setPhotos(data));
  };

  return {
    photos: trip.photos,
    onSubmit,
    onChange,
  };
}
