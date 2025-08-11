import { doc, setDoc } from 'firebase/firestore';

import type { Trip } from '@features/trip/types';
import { auth, firestore } from '@services/firebase';

export default async function addTrip(trip: Trip) {
  if (!auth.currentUser) {
    throw Error('Looks loke you are not-authorized to make this change!');
  }

  await setDoc(doc(firestore, 'trips', trip.id), {
    ...trip,
    userUid: auth.currentUser.uid,
  });
}
