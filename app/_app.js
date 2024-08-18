import store from '@/store';
import { Provider } from 'react-redux';
import { SWRProvider } from '@/lib/swrConfig'
import { ToastContainer } from 'react-toastify';
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
