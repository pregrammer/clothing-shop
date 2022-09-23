import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import CartRow from "../../components/CartRow";
import styles from "../../styles/cart.module.scss";

const Cart: NextPage = () => {
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | سبد خرید</title>
      </Head>
      <main className={styles.cart_page}>
        <div className={styles.header}>
          <h1>لیست محصولات:</h1>
        </div>
        <div className={styles.content}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>نام محصول</th>
                <th>تعداد</th>
                <th>قیمت واحد</th>
              </tr>
            </thead>
            <tbody>
              <CartRow />
              <CartRow />
              <CartRow />
              <CartRow />
            </tbody>
          </table>
          <div className={styles.continiue}>
            <Link href="/cart/payment">
              <a>ادامه</a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Cart;
