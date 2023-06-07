import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { CookiesProvider } from "react-cookie";

import { store } from '@/Redux/store'

//core
import "primereact/resources/primereact.min.css";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </CookiesProvider>
  );
}