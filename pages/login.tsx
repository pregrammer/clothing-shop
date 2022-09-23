import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FormEvent } from "react";
import styles from "../styles/userAuth.module.scss";

const login: NextPage = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | صفحه ورود کاربر</title>
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
          <div className={styles.submit_button}>
            <button type="submit">ورود</button>
          </div>
          <div className={styles.register_link}>
            <Link href="/register">
              <a>ثبت نام</a>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default login;
