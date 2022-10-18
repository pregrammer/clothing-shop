import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/profile.module.scss";
import ReactPaginate from "react-paginate";
import ProfileAside from "../../components/ProfileAside";
import { useEffect, useState } from "react";
import useAxiosAuthFunction from "../../helpers/useAxiosAuthFunction";

interface Order_product {
  id: number;
  name: string;
  price: string;
  discount: string;
  count: number;
  product_id: number;
  order_id: number;
}

interface Order {
  id: number;
  totallPrice: string;
  postKind: string;
  postPrice: string;
  discountCode: string | null;
  discountAmount: string;
  state: number;
  created_at: string;
  user_id: number;
  products: Order_product[];
}

const Profile_orders: NextPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [ordersData, axiosFetch]: any = useAxiosAuthFunction();

  useEffect(() => {
    axiosFetch({
      method: "GET",
      url: `/orders/user?page=${pageNumber}&limit=20`,
    });
  }, [pageNumber]);

  const handlePageClick = (e: any) => {
    const nextPage = e.selected + 1;
    setPageNumber(nextPage);
  };

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
              {Object.keys(ordersData).length !== 0 &&
                ordersData?.result.map((order: Order) => {
                  const d = new Date(order.created_at);
                  const order_created_at = d
                    .toLocaleString("fa-IR")
                    .split("،")
                    .join(" - ");
                  return (
                    <table key={order.id}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>نام محصول</th>
                          <th>تعداد</th>
                          <th>قیمت کل</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((order_product, i) => {
                          const priceWithDiscount = /%/.test(
                            order_product.discount
                          )
                            ? Number(order_product.price) -
                              (Number(order_product.price) *
                                Number(
                                  order_product.discount.replace("%", "")
                                )) /
                                100
                            : Number(order_product.price) -
                              Number(order_product.discount);
                          return (
                            <tr key={order_product.id}>
                              <td>{i + 1}</td>
                              <td>
                                <Link
                                  href={`/product/${order_product.product_id}`}
                                >
                                  <a>{order_product.name}</a>
                                </Link>
                              </td>
                              <td>{order_product.count}</td>
                              <td>{priceWithDiscount} تومان</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>پست:</td>
                          <td>{`${order.postKind} (${order.postPrice} تومان)`}</td>
                          <td>کد تخفیف:</td>
                          <td>
                            {order.discountCode !== "null" && order.discountCode
                              ? `${order.discountCode} (${order.discountAmount})`
                              : "ندارد"}
                          </td>
                        </tr>
                        <tr>
                          <td>تاریخ خرید:</td>
                          <td>{order_created_at}</td>
                          <td>جمع کل:</td>
                          <td>{order.totallPrice} تومان</td>
                        </tr>
                      </tfoot>
                    </table>
                  );
                })}
              {Object.keys(ordersData).length !== 0 &&
                ordersData?.totallItems > 20 && (
                  <div className={styles.pagi_container}>
                    <ReactPaginate
                      previousLabel={"<"}
                      nextLabel={">"}
                      breakLabel={"..."}
                      activeClassName={styles.active_pagi}
                      pageCount={
                        ordersData.totallItems
                          ? Math.ceil(ordersData.totallItems / 20)
                          : 0
                      }
                      pageRangeDisplayed={4}
                      onPageChange={handlePageClick}
                      initialPage={0}
                      renderOnZeroPageCount={() => null}
                    />
                  </div>
                )}
            </div>
          </div>
          <ProfileAside />
        </div>
      </main>
    </>
  );
};

export default Profile_orders;
