import { type SubmitHandler } from 'react-hook-form';

import PackingForm from '@features/trip/components/PackingForm';
import { type Trip } from '@features/trip/types';
import { useAppDispatch, useAppSelector } from '@store/index';

import {
  nextStep,
  selectWizardTrip,
  setPackingLists,
} from '../../store/tripWizardSlice';
import Pagination from '../Navigation/Pagination';

interface FormInput {
  packingLists: Trip['packingLists'];
}

export default function PackingList() {
  const { packingLists, onSubmit } = usePackingList();

  return (
    <PackingForm
      defaultPackingLists={packingLists}
      onSubmit={onSubmit}
      SubmitComponent={<Pagination />}
    />
  );
}

function usePackingList() {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setPackingLists(data.packingLists));
    dispatch(nextStep());
  };

  return {
    packingLists: trip.packingLists,
    onSubmit,
  };
}
