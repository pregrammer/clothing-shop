import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/management.module.scss";
import { useState } from "react";
import ManagementAside from "../../components/ManagementAside";
import ManagementHeader from "../../components/ManagementHeader";
import ManagementOrderTable from "../../components/ManagementOrderTable";
import ReactPaginate from "react-paginate";

const Manage_orders: NextPage = () => {
  const [asideIsOpen, setasideIsOpen] = useState(true);

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
            <ManagementOrderTable />
            {/* if state of order is unresoled, the bgc of table header should changed.  */}
            <ManagementOrderTable />
            <ManagementOrderTable />
            <ManagementOrderTable />
            <ManagementOrderTable />
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

export default Manage_orders;
