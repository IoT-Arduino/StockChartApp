import "../styles/globals.css";
import type { AppProps } from "next/app";
// import App from "next/app";
import UserProvider from '../contexts/user'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;

// App.getInitialProps = async () => ({ pageProps: {} });

// export default App;
