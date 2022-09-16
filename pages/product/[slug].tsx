import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/product.module.scss";
import ImageGallery from "react-image-gallery";

const Product: NextPage = () => {
  const productName: string = "پیراهن ورزشی مردانه 1991 اس دبلیو مدل Metallic";
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | {productName}</title>
      </Head>

      <main className={styles.product_page}>
        <div className={styles.product_gallery}>
          <ImageGallery items={images} showNav={false} showPlayButton={false} />
        </div>
        <div className={styles.product_description}>
          <h1>{productName}</h1>
          <div className={styles.product_features}>
            <b>ویژگی ها:</b>
            <ul>
              <li>
                نوع پارچه: <b>ابریشم</b>
              </li>
              <li>
                نوع پارچه: <b>ابریشم</b>
              </li>
              <li>
                نوع پارچه: <b>ابریشم</b>
              </li>
              <li>
                نوع پارچه: <b>ابریشم</b>
              </li>
              <li>
                نوع پارچه: <b>ابریشم</b>
              </li>
              <li>
                نوع پارچه: <b>ابریشم</b>
              </li>
            </ul>
          </div>
          <div className={styles.product_sizes}>
            <b>سایز:</b>
            <select>
              <option value="40">40</option>
              <option value="42">42</option>
              <option value="43">43</option>
            </select>
          </div>
        </div>
        <div className={styles.product_purchase}>
          <fieldset>
            <legend>جزئیات قیمت</legend>
            <div className={styles.price_container}>
              {/* <div>
                <del>1050000</del>
                <p className={styles.badge}>48%</p>
              </div> */}
              <p>8450000 تومان</p>
            </div>
            <button>افزودن به سبد</button>
            {/* <p className={styles.not_in_stock}>ناموجود</p> */}
          </fieldset>
        </div>
        <div className={styles.product_purchase_mobile}>
          <div className={styles.price_container}>
            {/* <div>
              <del>1050000</del>
              <p className={styles.badge}>48%</p>
            </div> */}
            <p>8450000 تومان</p>
          </div>
          <button>افزودن به سبد</button>
          {/* <p className={styles.not_in_stock}>ناموجود</p> */}
        </div>
      </main>
    </>
  );
};

export default Product;
