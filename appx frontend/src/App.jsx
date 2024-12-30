import './App.css';
import "@fontsource/poppins"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AppRoutes from './routes';

function App() {

  const THEME = createTheme({
    typography: {
      "fontFamily": `Poppins`,
      "fontSize": 15,
    }
  });

  return (
    <>
      <ThemeProvider theme={THEME}>
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
