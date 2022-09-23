import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/management.module.scss";
import { FormEvent, useState } from "react";
import ManagementAside from "../../components/ManagementAside";
import ManagementHeader from "../../components/ManagementHeader";
import ManagementPostPriceTable from "../../components/ManagementPostPriceTable";
import ManagementDiscountTable from "../../components/ManagementDiscountTable";

const Manage_side_prices: NextPage = () => {
  const [asideIsOpen, setasideIsOpen] = useState(true);

  const toggleAside = () => {
    setasideIsOpen((prev) => !prev);
  };
  const handlePostPriceSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleِDiscountSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | مدیریت قیمت های جانبی</title>
      </Head>
      <main className={styles.manage_side_prices}>
        <ManagementHeader toggleAside={toggleAside} />
        <ManagementAside asideIsOpen={asideIsOpen} />
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h2>لیست قیمت پست ها:</h2>
          </div>
          <div className={styles.addPostPrice}>
            <form onSubmit={handlePostPriceSubmit}>
              <div>
                <span>عنوان:</span>
                <input type="text" />
              </div>
              <div>
                <span>قیمت:</span>
                <input type="number" />
              </div>
              <button type="submit">افزودن قیمت پست</button>
            </form>
          </div>
          <div className={styles.contentTable}>
            <ManagementPostPriceTable />
          </div>
          <div className={styles.contentHeader}>
            <h2>لیست کد های تخفیف:</h2>
          </div>
          <div className={styles.addPostPrice}>
            <form onSubmit={handleِDiscountSubmit}>
              <div>
                <span>عنوان:</span>
                <input type="text" />
              </div>
              <div>
                <span>قیمت / درصد:</span>
                <input type="text" />
              </div>
              <button type="submit">افزودن کد تخفیف</button>
            </form>
          </div>
          <div className={styles.contentTable}>
            <ManagementDiscountTable />
          </div>
        </div>
      </main>
    </>
  );
};

export default Manage_side_prices;
