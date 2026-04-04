import {
  AttachMoney,
  ChecklistRounded,
  FlightTakeoff,
  InsertDriveFile,
  NavigateNext,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { APP_NAME } from '@config/constants';
import { AppRoutes } from '@config/routes/AppRoutes';
import { Colors } from '@config/styles/Colors';
import AppButton from '@features/ui/AppButton';
import Logo from '@features/ui/logo/Logo';

export default function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        component="nav"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" sx={{ py: 1 }}>
            <Box sx={{ width: 'fit-content' }}>
              <Logo />
            </Box>
          </Stack>
        </Container>
      </Box>

      <Box component="main" sx={{ flex: 1 }}>
        <Box
          sx={{
            bgcolor: Colors.lightGreen,
            py: { xs: 8, md: 14 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor: Colors.secondaryGreen,
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 10,
                px: 2,
                py: 0.5,
                mb: 3,
              }}
            >
              <FlightTakeoff
                sx={{ color: 'primary.main', fontSize: 16, mr: 0.75 }}
              />
              <Typography variant="caption" color="primary.main">
                Your travel companion
              </Typography>
            </Box>

            <Typography variant="h1" color="text.primary" mb={2.5}>
              Plan Every Journey,{' '}
              <Box component="span" color="primary.main">
                Stress-Free
              </Box>
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              mb={5}
              sx={{ maxWidth: 560, mx: 'auto' }}
            >
              {APP_NAME} keeps your trips, expenses, documents, and packing
              lists in one place — so you can focus on the adventure.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <AppButton
                href={AppRoutes.singUp}
                endIcon={<NavigateNext />}
                sx={{ minWidth: 200 }}
              >
                Get Started — It's Free
              </AppButton>
              <AppButton
                variant="outlined"
                href={AppRoutes.login}
                sx={{ minWidth: 160 }}
              >
                Log In
              </AppButton>
            </Stack>
          </Container>
        </Box>

        {/* Features */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={7}>
              <Typography variant="h2" color="text.primary" mb={1.5}>
                Everything you need to travel smarter
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 520, mx: 'auto' }}
              >
                From the moment you book to the day you land back home,{' '}
                {APP_NAME} has you covered.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {[
                {
                  icon: (
                    <FlightTakeoff
                      sx={{ fontSize: 36, color: 'primary.main' }}
                    />
                  ),
                  title: 'Trip Planning',
                  description:
                    'Create and manage all your trips in one place. Set destinations, dates, and keep everything organized.',
                },
                {
                  icon: (
                    <AttachMoney sx={{ fontSize: 36, color: 'primary.main' }} />
                  ),
                  title: 'Expense Tracking',
                  description:
                    'Track every expense during your travels. Stay on budget and get a clear overview of your spending.',
                },
                {
                  icon: (
                    <InsertDriveFile
                      sx={{ fontSize: 36, color: 'primary.main' }}
                    />
                  ),
                  title: 'Document Storage',
                  description:
                    'Keep passports, tickets, and travel documents safely stored and always accessible when you need them.',
                },
                {
                  icon: (
                    <ChecklistRounded
                      sx={{ fontSize: 36, color: 'primary.main' }}
                    />
                  ),
                  title: 'Packing Lists',
                  description:
                    'Never forget essentials again. Build custom packing lists and check items off as you pack.',
                },
              ].map((feature) => (
                <Grid item xs={12} sm={6} md={3} key={feature.title}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      borderRadius: 3,
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 4px 20px rgba(114,158,101,0.12)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2.5,
                          bgcolor: Colors.lightGreen,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2.5,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" color="text.primary" mb={1}>
                        {feature.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.100' }}>
          <Container maxWidth="md">
            <Box textAlign="center" mb={7}>
              <Typography variant="h2" color="text.primary" mb={1.5}>
                Up and running in minutes
              </Typography>
              <Typography variant="body1" color="text.secondary">
                No complicated setup — just sign up and start planning.
              </Typography>
            </Box>

            <Stack spacing={4}>
              {[
                {
                  number: '01',
                  title: 'Create an account',
                  description:
                    'Sign up for free and set up your traveler profile in seconds.',
                },
                {
                  number: '02',
                  title: 'Add your trip',
                  description:
                    'Enter your destination, travel dates, and any details about your journey.',
                },
                {
                  number: '03',
                  title: 'Stay organized',
                  description:
                    'Manage expenses, documents, and packing lists — all from one dashboard.',
                },
              ].map((step, index) => (
                <Stack
                  key={step.number}
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={3}
                >
                  <Box
                    sx={{
                      minWidth: 72,
                      height: 72,
                      borderRadius: '50%',
                      bgcolor:
                        index === 0 ? 'primary.main' : Colors.secondaryGreen,
                      border: '2px solid',
                      borderColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ color: index === 0 ? 'white' : 'primary.main' }}
                    >
                      {step.number}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="text.primary" mb={0.5}>
                      {step.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Container>
        </Box>

        <Box
          sx={{
            py: { xs: 8, md: 12 },
            bgcolor: 'primary.main',
            textAlign: 'center',
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h2" color="white" mb={2}>
              Ready to take off?
            </Typography>
            <Typography
              variant="body1"
              mb={5}
              sx={{ color: 'rgba(255,255,255,0.85)' }}
            >
              Join travelers who use {APP_NAME} to plan smarter and travel
              better.
            </Typography>
            <AppButton
              href={AppRoutes.singUp}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                minWidth: 200,
              }}
              endIcon={<NavigateNext />}
            >
              Create Free Account
            </AppButton>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
