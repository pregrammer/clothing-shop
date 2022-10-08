import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import styles from "../styles/userAuth.module.scss";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useAxiosPrivateFunction from "../helpers/useAxiosPrivateFunction";

const register: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [confirmedPass, setConfirmedPass] = useState<string>("");
  const [data, axiosFetch]: any = useAxiosPrivateFunction();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmedPass) {
      toast.error("رمز عبور با تکرار آن همخوانی ندارد", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    axiosFetch({
      method: "POST",
      url: "/auth/register",
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
      toast.success("با موفقیت ثبت نام شدید", {
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
        <title>فروشگاه پوشاک | صفحه ثبت نام کاربر</title>
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
          <div className={styles.form_control}>
            <span>تکرار رمز عبور:</span>
            <input
              type="password"
              required
              value={confirmedPass}
              onChange={(e) => setConfirmedPass(e.target.value)}
            />
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
