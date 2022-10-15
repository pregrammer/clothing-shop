import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/management.module.scss";
import Swal from "sweetalert2";

const ManagementOrderTable = () => {
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
        Swal.fire({
          title: "!حذف شد",
          icon: "success",
          html: "سفارش مورد نظر با موفقیت حذف شد",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "باشه",
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
    });
  };
  const handleCustomerClick = () => {
    Swal.fire({
      title: ":مشخصات کاربری",
      icon: "info",
      html: `<span>نام و نام خانوادگی: </span><b>مرتضی ایوبی</b><br>
      <span>نام و نام خانوادگی: </span><b>مرتضی ایوبی</b><br>
      <span>نام و نام خانوادگی: </span><b>مرتضی ایوبی</b><br>
      <span>نام و نام خانوادگی: </span><b>مرتضی ایوبی</b><br>
      <span>نام و نام خانوادگی: </span><b>مرتضی ایوبی</b><br>
      <span>نام و نام خانوادگی: </span><b>مرتضی ایوبی</b><br>
      <span>نام و نام خانوادگی: </span><b>مرتضی ایوبی</b><br>
      <span>نام و نام خانوادگی: </span><b>مرتضی ایوبی</b>`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "باشه",
    });
  };
  return (
    <table className={styles.order_table}>
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
          <td>پست:</td>
          <td>پیشتار (34000 تومان)</td>
          <td>کد تخفیف:</td>
          <td>َAdkfh64df (15%)</td>
        </tr>
        <tr>
          <td>تاریخ خرید:</td>
          <td>1401/10/26</td>
          <td>جمع کل:</td>
          <td>218000 تومان</td>
        </tr>
        <tr className={styles.ordersInfoRow}>
          <td>خریدار:</td>
          <td onClick={handleCustomerClick}>مرتضی ایوبی</td>
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
