import "../styles/global.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

// used just for management/product page.
import "react-image-gallery/styles/scss/image-gallery.scss";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
