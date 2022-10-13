import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/management.module.scss";
import { useEffect, useState } from "react";
import ManagementAside from "../../components/ManagementAside";
import ManagementHeader from "../../components/ManagementHeader";
import ManagementProductTable from "../../components/ManagementProductTable";
import ProductModal from "../../components/ProductModal";
import ReactPaginate from "react-paginate";
import useAxiosAuthFunction from "../../helpers/useAxiosAuthFunction";

interface Product {
  id: number;
  name: string;
  price: string;
  discount?: string;
  kind: string;
  features: { title: string; feature: string }[];
  inventories: { size: string; inventory: number }[];
}

const Manage_products: NextPage = () => {
  const [asideIsOpen, setasideIsOpen] = useState(true);
  const [modalContent, setModalContent] = useState<null | JSX.Element>(null);

  const [productsData, axiosFetch]: any = useAxiosAuthFunction();
  const [refreshPage, setRefreshPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    axiosFetch({
      method: "GET",
      url: `/products?page=${pageNumber}&limit=20`,
    });
  }, [pageNumber, refreshPage]);

  const handleRefreshPage = () => {
    setRefreshPage((prev) => !prev);
  };

  const handlePageClick = (e: any) => {
    const nextPage = e.selected + 1;
    setPageNumber(nextPage);
  };

  const toggleAside = () => {
    setasideIsOpen((prev) => !prev);
  };

  const handleProductModal = (editData?: Product) => {
    if (editData) {
      setModalContent((prev) =>
        prev ? null : (
          <ProductModal
            handleProductModal={handleProductModal}
            handleRefreshPage={handleRefreshPage}
            editData={editData}
          />
        )
      );
    } else {
      setModalContent((prev) =>
        prev ? null : (
          <ProductModal
            handleProductModal={handleProductModal}
            handleRefreshPage={handleRefreshPage}
          />
        )
      );
    }
  };

  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | مدیریت محصولات</title>
      </Head>
      {modalContent}
      <main className={styles.manage_products}>
        <ManagementHeader toggleAside={toggleAside} />
        <ManagementAside asideIsOpen={asideIsOpen} />
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h1>لیست محصولات:</h1>
            <button onClick={() => handleProductModal()}>محصول جدید</button>
          </div>
          <div className={styles.contentTable}>
            <ManagementProductTable
              products={productsData.result}
              handleProductModal={handleProductModal}
              handleRefreshPage={handleRefreshPage}
            />
          </div>
          {productsData?.totallItems > 20 && (
            <div className={styles.pagi_container}>
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                activeClassName={styles.active_pagi}
                pageCount={
                  productsData.totallItems
                    ? Math.ceil(productsData.totallItems / 20)
                    : 0
                }
                pageRangeDisplayed={4}
                onPageChange={handlePageClick}
                initialPage={0}
                renderOnZeroPageCount={() => null}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Manage_products;
