import "../styles/globals.css";
import type { AppProps } from "next/app";
// import App from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

// App.getInitialProps = async () => ({ pageProps: {} });

// export default App;
