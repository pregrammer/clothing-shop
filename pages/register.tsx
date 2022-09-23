import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent } from "react";
import styles from "../styles/userAuth.module.scss";

const register: NextPage = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | صفحه ثبت نام کاربر</title>
      </Head>
      <main className={styles.auth_page}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_control}>
            <span>ایمیل:</span>
            <input type="text" />
          </div>
          <div className={styles.form_control}>
            <span>رمز عبور:</span>
            <input type="password" />
          </div>
          <div className={styles.form_control}>
            <span>تکرار رمز عبور:</span>
            <input type="password" />
          </div>
          <div className={styles.submit_button}>
            <button type="submit">ثبت نام</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default register;
