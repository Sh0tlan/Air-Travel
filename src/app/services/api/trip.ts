import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import type { Trip } from '@features/trip/types';
import { auth, firestore } from '@services/firebase';

function aunthenticate<T>(authenticatedFn: () => Promise<T>) {
  if (!auth.currentUser) {
    throw Error('Looks like you are not-authorized to make this change!');
  }

  return authenticatedFn();
}

export async function getTrips() {
  return aunthenticate(async () => {
    const userTripsQuery = query(
      collection(firestore, 'trips'),
      where('userUid', '==', auth.currentUser!.uid),
    );

    const querySnapshot = await getDocs(userTripsQuery);

    return querySnapshot.docs.map((doc) => doc.data() as Trip);
  });
}

export async function getTripById(tripID?: string) {
  return aunthenticate(async () => {
    if (!tripID) {
      throw new Error('Trip not found!');
    }

    const tripRef = doc(firestore, 'trips', tripID);
    const tripSnap = await getDoc(tripRef);

    if (!tripSnap.exists()) {
      throw new Error('Trip not found!');
    }

    return tripSnap.data() as Trip;
  });
}

export async function updateTrip(tripId: string, data: Partial<Trip>) {
  return aunthenticate(async () => {
    if (!tripId) {
      throw new Error('Trip not found!');
    }

    const tripRef = doc(firestore, 'trips', tripId);

    await updateDoc(tripRef, data);

    return true;
  });
}
export async function deleteTrip(tripId: string) {
  return aunthenticate(async () => {
    if (!tripId) {
      throw new Error('Trip not found!');
    }

    const tripRef = doc(firestore, 'trips', tripId);

    await deleteDoc(tripRef);

    return true;
  });
}

export async function addTrip(trip: Trip) {
  return aunthenticate(async () => {
    await setDoc(doc(firestore, 'trips', trip.id), {
      ...trip,
      userUid: auth.currentUser!.uid,
    });
  });
}
