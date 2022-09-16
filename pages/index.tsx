import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/index.module.scss";

const Home: NextPage = () => {
  const id = 5;
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک</title>
        <meta
          name="description"
          content="فروشگاه پوشاک ارائه دهنده ی انواع لباس برای تمامی سنین"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.index_page}>
        <div className={styles.header}>
          <h1>آخرین محصولات</h1>
        </div>
        <div className={styles.container}>
          <Link href={`product/${id}`}>
            <a className={styles.card}>
              <div>
                <img
                  src="product_images/1.jpg"
                  alt="product-name"
                  width={300}
                  height={250}
                />
              </div>
              <p>پیراهن ورزشی مردانه 1991 اس دبلیو مدل Metallic</p>
              {/* <div className={styles.not_in_stock}>
                <p>ناموجود</p>
              </div> */}
              <div className={styles.in_stock}>
                <div className={styles.badge}>
                  <p>48%</p>
                </div>
                <div className={styles.price_detail}>
                  <p className={styles.current_price}>69000 تومان</p>
                  <del className={styles.last_price}>100000</del>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`product/${id}`}>
            <a className={styles.card}>
              <div>
                <img
                  src="product_images/2.jpg"
                  alt="product-name"
                  width={300}
                  height={250}
                />
              </div>
              <p>پیراهن ورزشی مردانه 1991 اس دبلیو مدل Metallic</p>
              {/* <div className={styles.not_in_stock}>
                <p>ناموجود</p>
              </div> */}
              <div className={styles.in_stock}>
                <div className={styles.badge}>
                  <p>48%</p>
                </div>
                <div className={styles.price_detail}>
                  <p className={styles.current_price}>69000 تومان</p>
                  <del className={styles.last_price}>100000</del>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`product/${id}`}>
            <a className={styles.card}>
              <div>
                <img
                  src="product_images/3.jpg"
                  alt="product-name"
                  width={300}
                  height={250}
                />
              </div>
              <p>پیراهن ورزشی مردانه 1991 اس دبلیو مدل Metallic</p>
              {/* <div className={styles.not_in_stock}>
                <p>ناموجود</p>
              </div> */}
              <div className={styles.in_stock}>
                <div className={styles.badge}>
                  <p>48%</p>
                </div>
                <div className={styles.price_detail}>
                  <p className={styles.current_price}>69000 تومان</p>
                  <del className={styles.last_price}>100000</del>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`product/${id}`}>
            <a className={styles.card}>
              <div>
                <img
                  src="product_images/4.jpg"
                  alt="product-name"
                  width={300}
                  height={250}
                />
              </div>
              <p>پیراهن ورزشی مردانه 1991 اس دبلیو مدل Metallic</p>
              {/* <div className={styles.not_in_stock}>
                <p>ناموجود</p>
              </div> */}
              <div className={styles.in_stock}>
                <div className={styles.badge}>
                  <p>48%</p>
                </div>
                <div className={styles.price_detail}>
                  <p className={styles.current_price}>69000 تومان</p>
                  <del className={styles.last_price}>100000</del>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`product/${id}`}>
            <a className={styles.card}>
              <div>
                <img
                  src="product_images/5.jpg"
                  alt="product-name"
                  width={300}
                  height={250}
                />
              </div>
              <p>پیراهن ورزشی مردانه 1991 اس دبلیو مدل Metallic</p>
              {/* <div className={styles.not_in_stock}>
                <p>ناموجود</p>
              </div> */}
              <div className={styles.in_stock}>
                <div className={styles.badge}>
                  <p>48%</p>
                </div>
                <div className={styles.price_detail}>
                  <p className={styles.current_price}>69000 تومان</p>
                  <del className={styles.last_price}>100000</del>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`product/${id}`}>
            <a className={styles.card}>
              <div>
                <img
                  src="product_images/6.jpg"
                  alt="product-name"
                  width={300}
                  height={250}
                />
              </div>
              <p>پیراهن ورزشی مردانه 1991 اس دبلیو مدل Metallic</p>
              {/* <div className={styles.not_in_stock}>
                <p>ناموجود</p>
              </div> */}
              <div className={styles.in_stock}>
                <div className={styles.badge}>
                  <p>48%</p>
                </div>
                <div className={styles.price_detail}>
                  <p className={styles.current_price}>69000 تومان</p>
                  <del className={styles.last_price}>100000</del>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`product/${id}`}>
            <a className={styles.card}>
              <div>
                <img
                  src="product_images/7.jpg"
                  alt="product-name"
                  width={300}
                  height={250}
                />
              </div>
              <p>پیراهن ورزشی مردانه 1991 اس دبلیو مدل Metallic</p>
              {/* <div className={styles.not_in_stock}>
                <p>ناموجود</p>
              </div> */}
              <div className={styles.in_stock}>
                <div className={styles.badge}>
                  <p>48%</p>
                </div>
                <div className={styles.price_detail}>
                  <p className={styles.current_price}>69000 تومان</p>
                  <del className={styles.last_price}>100000</del>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`product/${id}`}>
            <a className={styles.card}>
              <div>
                <img
                  src="product_images/8.jpg"
                  alt="product-name"
                  width={300}
                  height={250}
                />
              </div>
              <p>پیراهن ورزشی مردانه 1991 اس دبلیو مدل Metallic</p>
              {/* <div className={styles.not_in_stock}>
                <p>ناموجود</p>
              </div> */}
              <div className={styles.in_stock}>
                <div className={styles.badge}>
                  <p>48%</p>
                </div>
                <div className={styles.price_detail}>
                  <p className={styles.current_price}>69000 تومان</p>
                  <del className={styles.last_price}>100000</del>
                </div>
              </div>
            </a>
          </Link>
          <Link href={`product/${id}`}>
            <a className={styles.card}>
              <div>
                <img
                  src="product_images/9.jpg"
                  alt="product-name"
                  width={300}
                  height={250}
                />
              </div>
              <p>پیراهن ورزشی مردانه 1991 اس دبلیو مدل Metallic</p>
              {/* <div className={styles.not_in_stock}>
                <p>ناموجود</p>
              </div> */}
              <div className={styles.in_stock}>
                <div className={styles.badge}>
                  <p>48%</p>
                </div>
                <div className={styles.price_detail}>
                  <p className={styles.current_price}>69000 تومان</p>
                  <del className={styles.last_price}>100000</del>
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.see_all}>
          <Link href="/products">
            <a>مشاهده ی همه</a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
