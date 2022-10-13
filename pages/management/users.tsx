import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/management.module.scss";
import { useEffect, useState } from "react";
import ManagementAside from "../../components/ManagementAside";
import ManagementHeader from "../../components/ManagementHeader";
import ReactPaginate from "react-paginate";
import ManagementUserTable from "../../components/ManagementUserTable";
import useAxiosAuthFunction from "../../helpers/useAxiosAuthFunction";

const Manage_users: NextPage = () => {
  const [asideIsOpen, setasideIsOpen] = useState(true);
  const [refreshPage, setRefreshPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [usersData, axiosFetch]: any = useAxiosAuthFunction();

  useEffect(() => {
    axiosFetch({
      method: "GET",
      url: `/users?page=${pageNumber}&limit=20`,
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
            <ManagementUserTable
              users={usersData.result}
              handleRefreshPage={handleRefreshPage}
            />
          </div>
          {usersData?.totallItems > 20 && (
            <div className={styles.pagi_container}>
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                activeClassName={styles.active_pagi}
                pageCount={
                  usersData.totallItems
                    ? Math.ceil(usersData.totallItems / 20)
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

export default Manage_users;
