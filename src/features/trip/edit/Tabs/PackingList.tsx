import PackingForm from '@features/trip/components/PackingForm';
import { type Trip } from '@features/trip/types';

import ContentCard from './ContentCard';

interface Props {
  trip: Trip;
  onUpdate: (data: Partial<Trip>) => void;
}

export default function PackingList({ trip, onUpdate }: Props) {
  const onChange = (packingLists: Trip['packingLists']) => {
    console.log('change');
    onUpdate({ packingLists });
  };

  return (
    <ContentCard title="Packing List">
      <PackingForm
        defaultPackingLists={trip.packingLists}
        onChange={onChange}
      />
    </ContentCard>
  );
}
