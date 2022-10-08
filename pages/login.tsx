import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivateFunction from "../helpers/useAxiosPrivateFunction";
import styles from "../styles/userAuth.module.scss";

const login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [data, axiosFetch]: any = useAxiosPrivateFunction();
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosFetch({
      method: "POST",
      url: "/auth/login",
      requestConfig: {
        data: {
          email,
          password,
        },
      },
    });
  };

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      localStorage.setItem("jwt", data.accessToken);
      router.replace("/");
      toast.success("با موفقیت وارد شدید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [data]);
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | صفحه ورود کاربر</title>
      </Head>
      <main className={styles.auth_page}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_control}>
            <span>ایمیل:</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form_control}>
            <span>رمز عبور:</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
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
