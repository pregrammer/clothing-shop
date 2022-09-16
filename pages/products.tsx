import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/products.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ReactPaginate from "react-paginate";

const Products: NextPage = () => {
  const id: number = 5;
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | محصولات</title>
      </Head>

      <div className={styles.container}>
        <main>
          <div className={styles.header}>
            <h1>محصولات:</h1>
          </div>
          <div className={styles.product_container}>
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
        </main>
        <aside>
          <p className={styles.mobile_category}>
            دسته بندی
            <FontAwesomeIcon icon={faAngleDown} />
          </p>
          <fieldset>
            <legend>دسته بندی</legend>
            <div className={styles.form_control}>
              <input type="checkbox" value="لباس" name="clothes" id="clothes" />
              <label htmlFor="clothes">لباس</label>
            </div>
            <div className={styles.form_control}>
              <input type="checkbox" value="شلوار" name="pants" id="pants" />
              <label htmlFor="pants">شلوار</label>
            </div>
            <div className={styles.form_control}>
              <input type="checkbox" value="کفش" name="shoes" id="shoes" />
              <label htmlFor="shoes">کفش</label>
            </div>
            <div className={styles.form_control}>
              <input
                type="checkbox"
                value="اکسسوری مردانه"
                name="men_accessory"
                id="men_accessory"
              />
              <label htmlFor="men_accessory">اکسسوری مردانه</label>
            </div>
            <div className={styles.form_control}>
              <input
                type="checkbox"
                value="اکسسوری زنانه"
                name="femail_accessory"
                id="femail_accessory"
              />
              <label htmlFor="femail_accessory">اکسسوری زنانه</label>
            </div>
          </fieldset>
        </aside>
      </div>
    </>
  );
};

export default Products;
