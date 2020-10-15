import { AppPropsType } from 'next/dist/next-server/lib/utils';
import MainLayout from '../layout/MainLayout';
import '../styles/globals.scss';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppPropsType) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
