import { useNavigate, useParams } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Breadcrumbs,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import { AppRoutes } from '@config/routes';
import { Colors } from '@config/styles';
import AppButton from '@features/ui/AppButton';
import AppDialog from '@features/ui/AppDialog';
import useDialog from '@hooks/useDialog';
import useToast from '@hooks/useToast';
import { deleteTrip } from '@services/api';

import { useGetTripQuery, useUpdateTripMutation } from '../store/tripsApi';
import { Trip } from '../types';
import Hero from './Hero/Hero';
import TripTabs from './Tabs/TripTabs';

export default function TripDetails() {
  const navigate = useNavigate();
  const { showSuccessMessage } = useToast();
  const { isOpen, open, close } = useDialog();
  const { tripId } = useParams();
  const { data: trip, isLoading, isSuccess, isError } = useGetTripQuery(tripId);
  const [updateTrip] = useUpdateTripMutation();

  const onTripUpdate = (data: Partial<Trip>) => {
    updateTrip({ id: trip!.id, data });
  };

  const onDeleteTrip = async () => {
    close();
    navigate(AppRoutes.trips);
    await deleteTrip(tripId!);
    showSuccessMessage('Trip was successfully deleted!');
  };

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess) {
    return (
      <Stack pb={4}>
        <Stack
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={AppRoutes.trips}>
              Trips
            </Link>
            <Typography color={Colors.secondaryBlue} variant="subtitle2">
              {trip.name}
            </Typography>
          </Breadcrumbs>
          <AppButton
            endIcon={<DeleteIcon />}
            isSmall
            color="error"
            onClick={open}
          >
            Delete
          </AppButton>
        </Stack>
        <Hero trip={trip} onUpdate={onTripUpdate} />
        <TripTabs trip={trip} onUpdate={onTripUpdate} />
        <AppDialog
          title="Are you sure that you want to delete this trip?"
          primaryButtonText="Yes"
          secondaryButtonText="No"
          isOpen={isOpen}
          onClose={close}
          onSecondaryButtonClick={close}
          onPrimaryButtonClick={onDeleteTrip}
          maxWidth={460}
          disableBottomTitlePadding
          hideCloseButton
        />
      </Stack>
    );
  } else if (isError) {
    throw Error;
  }
  return null;
}
