import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/management.module.scss";
import { useState } from "react";
import ManagementAside from "../../components/ManagementAside";
import ManagementHeader from "../../components/ManagementHeader";
import ReactPaginate from "react-paginate";
import ManagementUserTable from "../../components/ManagementUserTable";

const Manage_users: NextPage = () => {
  const [asideIsOpen, setasideIsOpen] = useState(true);

  const toggleAside = () => {
    setasideIsOpen((prev) => !prev);
  };
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | مدیریت کاربران</title>
      </Head>
      <main className={styles.manage_users}>
        <ManagementHeader toggleAside={toggleAside} />
        <ManagementAside asideIsOpen={asideIsOpen} />
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h1>لیست کاربران:</h1>
          </div>
          <div className={styles.contentTable}>
            <ManagementUserTable />
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

export default Manage_users;
