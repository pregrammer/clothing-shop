import "../styles/global.scss";
import type { AppProps } from "next/app";
import LoadingProvider from "../hooks/contexts/LoadingProvider";
import Layout from "../components/Layout";
import "react-toastify/dist/ReactToastify.css";

// used just for management/product page.
import "react-image-gallery/styles/scss/image-gallery.scss";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LoadingProvider>
  );
}

export default MyApp;
