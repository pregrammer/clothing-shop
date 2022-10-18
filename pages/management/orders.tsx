import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/management.module.scss";
import { useEffect, useState } from "react";
import ManagementAside from "../../components/ManagementAside";
import ManagementHeader from "../../components/ManagementHeader";
import ManagementOrderTable from "../../components/ManagementOrderTable";
import ReactPaginate from "react-paginate";
import useAxiosAuthFunction from "../../helpers/useAxiosAuthFunction";

interface Order_product {
  id: number;
  name: string;
  price: string;
  discount: string;
  count: number;
  product_id: number;
  order_id: number;
}

interface Order {
  id: number;
  totallPrice: string;
  postKind: string;
  postPrice: string;
  discountCode: string | null;
  discountAmount: string;
  state: number;
  created_at: string;
  user_id: number;
  products: Order_product[];
}

const Manage_orders: NextPage = () => {
  const [asideIsOpen, setasideIsOpen] = useState(true);
  const [refreshPage, setRefreshPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [ordersData, axiosFetch]: any = useAxiosAuthFunction();

  useEffect(() => {
    axiosFetch({
      method: "GET",
      url: `/orders/users?page=${pageNumber}&limit=20`,
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

  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | مدیریت سفارشات</title>
      </Head>
      <main className={styles.manage_orders}>
        <ManagementHeader toggleAside={toggleAside} />
        <ManagementAside asideIsOpen={asideIsOpen} />
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h1>لیست سفارشات:</h1>
          </div>
          <div className={styles.contentTable}>
            {Object.keys(ordersData).length !== 0 &&
              ordersData?.result.map((order: Order) => (
                <ManagementOrderTable
                  key={order.id}
                  order={order}
                  handleRefreshPage={handleRefreshPage}
                />
              ))}
          </div>
          {Object.keys(ordersData).length !== 0 &&
            ordersData?.totallItems > 20 && (
              <div className={styles.pagi_container}>
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  activeClassName={styles.active_pagi}
                  pageCount={
                    ordersData.totallItems
                      ? Math.ceil(ordersData.totallItems / 20)
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

export default Manage_orders;
