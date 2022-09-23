import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/management.module.scss";
import Swal from "sweetalert2";

const MPostPTRow = () => {
  const handleDeletePostPrice = () => {
    Swal.fire({
      title: "آیا از حذف این قیمت پست مطمعن هستید؟",
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
          html: "قیمت پست مورد نظر با موفقیت حذف شد",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "باشه",
        });
      }
    });
  };
  return (
    <tr>
      <td>1</td>
      <td>پیشتاز</td>
      <td>98000 تومان</td>
      <td className={styles.change_user_td}>
        <FontAwesomeIcon icon={faTrash} onClick={handleDeletePostPrice} />
      </td>
    </tr>
  );
};

export default MPostPTRow;
