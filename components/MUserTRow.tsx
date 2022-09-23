import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/management.module.scss";
import Swal from "sweetalert2";

const MUserTRow = () => {
  const userState = false;
  const handleDeleteUser = () => {
    Swal.fire({
      title: "آیا از حذف این کاربر مطمعن هستید؟",
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
          html: "کاربر مورد نظر با موفقیت حذف شد",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "باشه",
        });
      }
    });
  };
  const handleBanUser = () => {
    Swal.fire({
      title: "آیا از به تعلیق درآوردن این کاربر مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "!معلق شد",
          icon: "success",
          html: "کاربر مورد نظر با موفقیت معلق شد",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "باشه",
        });
      }
    });
  };
  const handleUnbanUser = () => {
    Swal.fire({
      title: "آیا از درآوردن این کاربر از تعلیق مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "!از تعلیق درآمد",
          icon: "success",
          html: "کاربر مورد نظر با موفقیت از تعلیق درآمد",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "باشه",
        });
      }
    });
  };
  return (
    <tr>
      <td>1</td>
      <td>مرتضی ایوبی</td>
      <td>m_morteza_a@yahoo.com</td>
      <td>09164879562</td>
      <td>1400/08/15</td>
      <td className={styles.change_user_td}>
        <FontAwesomeIcon icon={faBan} onClick={handleBanUser} />
        {userState && (
          <FontAwesomeIcon icon={faUserCheck} onClick={handleUnbanUser} />
        )}
        <FontAwesomeIcon icon={faTrash} onClick={handleDeleteUser} />
      </td>
    </tr>
  );
};

export default MUserTRow;
