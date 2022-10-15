import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import axios from "../api/axios";
import ProductCart from "../components/ProductCart";
import styles from "../styles/index.module.scss";

interface Product {
  id: number;
  name: string;
  price: string;
  discount: string;
  kind: string;
  image_url: string;
  in_stock: boolean;
}

interface Prop {
  products: Product[];
}

const Home: NextPage<Prop> = (prop) => {
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک</title>
        <meta
          name="description"
          content="فروشگاه پوشاک ارائه دهنده ی انواع لباس برای تمامی سنین"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.index_page}>
        <div className={styles.header}>
          <h1>آخرین محصولات</h1>
        </div>
        <div className={styles.container}>
          {prop.products.map((product: Product) => (
            <ProductCart key={product.id} product={product} />
          ))}
        </div>
        <div className={styles.see_all}>
          <Link href="/products">
            <a>مشاهده ی همه</a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get("/products/index-page");

  // Pass data to the page via props
  return { props: { products: res.data } };
}
