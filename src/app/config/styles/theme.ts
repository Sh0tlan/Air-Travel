import { createTheme } from '@mui/material';

import { FontFamilies } from './FontFamilies';
import { FontWeights } from './FontWeights';

const theme = createTheme({
  palette: {
    primary: { main: '#729E65' },
  },
});

theme.typography.h1 = {
  fontSize: '2rem',
  lineHeight: '3rem',
  fontFamily: FontFamilies.popins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
  },
};
export default theme;
