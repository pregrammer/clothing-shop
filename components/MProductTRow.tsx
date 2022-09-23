import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/management.module.scss";
import Swal from "sweetalert2";

const MProductTRow = () => {
  const handleDeleteProduct = () => {
    Swal.fire({
      title: "آیا از حذف این محصول مطمعن هستید؟",
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
          html: "محصول مورد نظر با موفقیت حذف شد",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "باشه",
        });
      }
    });
  };
  return (
    <tr>
      <td>1</td>
      <td>
        <Link href="/product/5">
          <a>تی شرت مشکی</a>
        </Link>
      </td>
      <td className={styles.inventory_td}>
        <div>
          <b>سایز</b>
          <b>موجودی</b>
        </div>
        <div>
          <span>43</span>
          <span>6</span>
        </div>
        <div>
          <span>XL</span>
          <span>12</span>
        </div>
      </td>
      <td>109000 تومان</td>
      <td className={styles.change_product_td}>
        <FontAwesomeIcon icon={faEdit} />
        <FontAwesomeIcon icon={faTrash} onClick={handleDeleteProduct} />
      </td>
    </tr>
  );
};

export default MProductTRow;
