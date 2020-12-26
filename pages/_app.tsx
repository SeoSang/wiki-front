import { AppPropsType } from 'next/dist/next-server/lib/utils';
import MainLayout from '../layout/MainLayout';
import '../styles/globals.scss';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../styles/theme';
import { store, useTypedSelector } from '../features';
import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { meSelector } from '../features/user/userSlice';
import { loadMe } from '../features/user/action';

function MyApp({ Component, pageProps }: AppPropsType) {
  const state = store.getState();
  useEffect(() => {
    if (!state.user.me) {
      store.dispatch(loadMe({}));
    }
  }, []);
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
