import { AppRouter } from '@config/routes';
import theme from '@config/styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}
