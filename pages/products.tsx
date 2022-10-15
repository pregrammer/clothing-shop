import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/products.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import ProductsFilter from "../components/ProductsFilter";
import axios from "../api/axios";
import ProductCart from "../components/ProductCart";
import { useRouter } from "next/router";

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
  productsData: { totallItems: number; result: Product[] };
}

const Products: NextPage<Prop> = (prop) => {
  const [isAsideOpen, setIsAsideOpen] = useState(true);
  const router = useRouter();

  const toggleMobileAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

  const handlePageClick = (e: any) => {
    const nextPage = e.selected + 1;
    //const kinds = router.query.kinds;

    router.push({
      pathname: "/products",
      query: { page: nextPage },
    });
  };
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | محصولات</title>
      </Head>

      <div className={styles.container}>
        <main>
          <div className={styles.header}>
            <h1>محصولات:</h1>
          </div>
          <div className={styles.product_container}>
            {prop.productsData.result.map((product: Product) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </div>
          {prop.productsData.totallItems > 20 && (
            <div className={styles.pagi_container}>
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                activeClassName={styles.active_pagi}
                pageCount={
                  prop.productsData.totallItems
                    ? Math.ceil(prop.productsData.totallItems / 20)
                    : 0
                }
                pageRangeDisplayed={4}
                onPageChange={handlePageClick}
                initialPage={
                  Number(router.query.page) ? Number(router.query.page) : 0
                }
                renderOnZeroPageCount={() => null}
              />
            </div>
          )}
        </main>
        <aside>
          <p className={styles.mobile_category} onClick={toggleMobileAside}>
            دسته بندی
            <FontAwesomeIcon icon={faAngleDown} />
          </p>
          {isAsideOpen && <ProductsFilter />}
        </aside>
      </div>
    </>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page || 1; //if page empty we request the first page
  const kinds = query.kinds || "all";

  // Fetch data from external API
  const res = await axios.get(`/products/filtered`, {
    params: {
      page,
      kinds,
      limit: 20,
    },
  });

  // Pass data to the page via props
  return { props: { productsData: res.data } };
};
