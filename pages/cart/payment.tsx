import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/payment.module.scss";

const Payment: NextPage = () => {
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | پرداخت</title>
      </Head>
      <main>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>اطلاعات خرید:</h1>
          </div>
          <div className={styles.fieldsets}>
            <fieldset>
              <legend>مشخصات کاربری</legend>
              <div className={styles.user_info}>
                <div>
                  <b>نام و نام خانوادگی:</b>
                  <span>مرتضی ایوبی</span>
                </div>
                <div>
                  <b>شماره همراه:</b>
                  <span>09124563218</span>
                </div>
                <div>
                  <b>کد پستی:</b>
                  <span>8412635198</span>
                </div>
                <div>
                  <b>ایمیل:</b>
                  <span>m_morteza_a@yahoo.com</span>
                </div>
                <div>
                  <b>آدرس دقیق:</b>
                  <span>
                    استان تهران - شهرستان فیروزکوه - خیابان ظفر- فرعی نصر - پلاک
                    18 - واحد 9
                  </span>
                </div>
                <div>
                  <Link href="/profile/edit">
                    <a>ویرایش</a>
                  </Link>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>نحوه ی ارسال</legend>
              <div className={styles.post_radios}>
                <div className={styles.radio_control}>
                  <input
                    type="radio"
                    name="post-kind"
                    id="normal-post"
                    defaultChecked
                  />
                  <label htmlFor="normal-post">پست عادی (12 هزار تومان)</label>
                </div>
                <div className={styles.radio_control}>
                  <input type="radio" name="post-kind" id="pishtaz-post" />
                  <label htmlFor="pishtaz-post">
                    پست پیشتاز (34 هزار تومان)
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>اعمال کد تخفیف</legend>
              <form>
                <input
                  type="text"
                  placeholder="لطفا کد تخفیف خود را وارد کنید"
                />
                <button>ثبت</button>
              </form>
            </fieldset>
            <fieldset>
              <legend>مشخصات خرید</legend>
              <div className={styles.purchase_info}>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>نام محصول</th>
                      <th>تعداد</th>
                      <th>قیمت کل</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <Link href="/product/5">
                          <a>تی شرت مشکی</a>
                        </Link>
                      </td>
                      <td>3</td>
                      <td>109000 تومان</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <Link href="/product/5">
                          <a>تی شرت سفید</a>
                        </Link>
                      </td>
                      <td>3</td>
                      <td>109000 تومان</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>هزینه پست:</td>
                      <td>34000 تومان</td>
                      <td>درصد تخفیف:</td>
                      <td>15%</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>جمع قابل پرداخت:</td>
                      <td colSpan={2}>218000 تومان</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </fieldset>
          </div>
          <div className={styles.pay_button}>
            <button>پرداخت</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Payment;
