import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
