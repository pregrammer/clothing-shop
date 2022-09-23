import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/management.module.scss";
import { useState } from "react";
import ManagementAside from "../../components/ManagementAside";
import ManagementHeader from "../../components/ManagementHeader";
import ManagementProductTable from "../../components/ManagementProductTable";
import ProductModal from "../../components/ProductModal";
import ReactPaginate from "react-paginate";

const Manage_products: NextPage = () => {
  const [asideIsOpen, setasideIsOpen] = useState(true);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);

  const toggleAside = () => {
    setasideIsOpen((prev) => !prev);
  };
  const handleProductModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setProductModalIsOpen((prev) => !prev);
  };
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | مدیریت محصولات</title>
      </Head>
      {productModalIsOpen && (
        <ProductModal handleProductModal={handleProductModal} />
      )}
      <main className={styles.manage_products}>
        <ManagementHeader toggleAside={toggleAside} />
        <ManagementAside asideIsOpen={asideIsOpen} />
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h1>لیست محصولات:</h1>
            <button onClick={handleProductModal}>محصول جدید</button>
          </div>
          <div className={styles.contentTable}>
            <ManagementProductTable />
          </div>
          <div className={styles.pagi_container}>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              activeClassName={styles.active_pagi}
              pageCount={20}
              pageRangeDisplayed={5}
              initialPage={0}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Manage_products;
