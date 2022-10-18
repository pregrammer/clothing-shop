import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/management.module.scss";
import Swal from "sweetalert2";
import useAxiosAuthFunction from "../helpers/useAxiosAuthFunction";
import { useEffect } from "react";

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

interface Prop {
  order: Order;
  handleRefreshPage: () => void;
}

const ManagementOrderTable = ({ order, handleRefreshPage }: Prop) => {
  const [customerData, axiosFetch]: any = useAxiosAuthFunction();
  const [data, axiosFetch2]: any = useAxiosAuthFunction();

  const handleDeleteOrder = () => {
    Swal.fire({
      title: "آیا از حذف این سفارش مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosFetch2({
          method: "DELETE",
          url: `/orders`,
          requestConfig: {
            data: { id: order.id },
          },
        });
      }
    });
  };

  const handleChangeOrderState = () => {
    Swal.fire({
      title: "آیا از تغییر وضعیت این سفارش مطمعن هستید؟",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosFetch2({
          method: "PUT",
          url: `/orders/change-state`,
          requestConfig: {
            data: { id: order.id },
          },
        });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      handleRefreshPage();
      Swal.fire({
        title: "!ویرایش شد",
        icon: "success",
        html: data.message,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "باشه",
      });
    }
  }, [data]);

  const handleCustomerClick = () => {
    axiosFetch({
      method: "GET",
      url: `/users/user?id=${order.user_id}`,
    });
  };
  useEffect(() => {
    if (Object.keys(customerData).length !== 0) {
      Swal.fire({
        title: ":مشخصات کاربری",
        icon: "info",
        html: `<span>نام و نام خانوادگی: </span><b>${customerData.user.firstName} ${customerData.user.lastName}</b><br>
        <b>${customerData.user.email}</b><span> :ایمیل</span><br>
        <span>شماره تلفن: </span><b>${customerData.user.phoneNumber}</b><br>
        <span>کد پستی: </span><b>${customerData.user.postalCode}</b><br>
        <span>آدرس: </span><b>${customerData.user.address}</b>`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "باشه",
      });
    }
  }, [customerData]);

  const d = new Date(order.created_at);
  const order_created_at = d.toLocaleString("fa-IR").split("،").join(" - ");

  return (
    <table className={styles.order_table}>
      <thead>
        <tr>
          <th style={order.state === 2 ? { backgroundColor: "red" } : {}}>#</th>
          <th style={order.state === 2 ? { backgroundColor: "red" } : {}}>
            نام محصول
          </th>
          <th style={order.state === 2 ? { backgroundColor: "red" } : {}}>
            تعداد
          </th>
          <th style={order.state === 2 ? { backgroundColor: "red" } : {}}>
            قیمت کل
          </th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((order_product, i) => {
          const priceWithDiscount = /%/.test(order_product.discount)
            ? Number(order_product.price) -
              (Number(order_product.price) *
                Number(order_product.discount.replace("%", ""))) /
                100
            : Number(order_product.price) - Number(order_product.discount);
          return (
            <tr key={order_product.id}>
              <td>{i + 1}</td>
              <td>
                <Link href={`/product/${order_product.product_id}`}>
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
        <tr className={styles.ordersInfoRow}>
          <td>خریدار:</td>
          <td onClick={handleCustomerClick}>مشخصات خریدار</td>
          <td>تغییرات:</td>
          <td>
            <FontAwesomeIcon icon={faRotate} onClick={handleChangeOrderState} />
            <FontAwesomeIcon icon={faTrash} onClick={handleDeleteOrder} />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ManagementOrderTable;
