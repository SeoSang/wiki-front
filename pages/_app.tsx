import { AppPropsType } from 'next/dist/next-server/lib/utils';
import MainLayout from '../layout/MainLayout';
import '../styles/globals.scss';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../styles/theme';
import { store } from '../features';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppPropsType) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
