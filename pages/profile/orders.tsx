import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/profile.module.scss";
import ReactPaginate from "react-paginate";

const Profile_orders: NextPage = () => {
  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | سفارشات من</title>
      </Head>

      <main className={styles.profile_page}>
        <div className={styles.header}>
          <h1>پروفایل کاربری</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.orders}>
              <h2>لیست سفارشات:</h2>
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
                    <td>تی شرت مشکی</td>
                    <td>3</td>
                    <td>109000 تومان</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>تی شرت سفید</td>
                    <td>3</td>
                    <td>109000 تومان</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>تاریخ خرید:</td>
                    <td>1401/10/26</td>
                    <td>جمع کل:</td>
                    <td>218000 تومان</td>
                  </tr>
                </tfoot>
              </table>
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
                    <td>تی شرت مشکی</td>
                    <td>3</td>
                    <td>109000 تومان</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>تی شرت سفید</td>
                    <td>3</td>
                    <td>109000 تومان</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>تاریخ خرید:</td>
                    <td>1401/10/26</td>
                    <td>جمع کل:</td>
                    <td>218000 تومان</td>
                  </tr>
                </tfoot>
              </table>
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
                    <td>تی شرت مشکی</td>
                    <td>3</td>
                    <td>109000 تومان</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>تی شرت سفید</td>
                    <td>3</td>
                    <td>109000 تومان</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>تاریخ خرید:</td>
                    <td>1401/10/26</td>
                    <td>جمع کل:</td>
                    <td>218000 تومان</td>
                  </tr>
                </tfoot>
              </table>
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
                    <td>تی شرت مشکی</td>
                    <td>3</td>
                    <td>109000 تومان</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>تی شرت سفید</td>
                    <td>3</td>
                    <td>109000 تومان</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>تاریخ خرید:</td>
                    <td>1401/10/26</td>
                    <td>جمع کل:</td>
                    <td>218000 تومان</td>
                  </tr>
                </tfoot>
              </table>
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
                    <td>تی شرت مشکی</td>
                    <td>3</td>
                    <td>109000 تومان</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>تی شرت سفید</td>
                    <td>3</td>
                    <td>109000 تومان</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>تاریخ خرید:</td>
                    <td>1401/10/26</td>
                    <td>جمع کل:</td>
                    <td>218000 تومان</td>
                  </tr>
                </tfoot>
              </table>
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
            </div>
          </div>
          <aside>
            <div>
              <Link href="/profile/edit">
                <a>ویرایش مشخصات</a>
              </Link>
              <Link href="/profile/orders">
                <a>سفارشات من</a>
              </Link>
              <button>خروج</button>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default Profile_orders;
