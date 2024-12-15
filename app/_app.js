import store from '@/store';
import { SWRProvider } from '@/utils/lib/swrConfig';
import { Provider } from 'react-redux';
git adimport { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (

    <Provider store={store}>
      <SWRProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </SWRProvider>
    </Provider>
  );
}

export default MyApp;
