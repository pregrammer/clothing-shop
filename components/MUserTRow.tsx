import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/management.module.scss";
import Swal from "sweetalert2";
import useAxiosAuthFunction from "../helpers/useAxiosAuthFunction";
import { useEffect } from "react";

interface User {
  id: number;
  fullName: string;
  state: number;
  email: string;
  phoneNumber: string;
  created_at: string;
}

interface Prop {
  user: User;
  rowNumber: number;
  handleRefreshPage: () => void;
}

const MUserTRow = ({ user, rowNumber, handleRefreshPage }: Prop) => {
  const d = new Date(user.created_at);
  const user_created_at = d.toLocaleString("fa-IR").split("،").join(" - ");

  const [data, axiosFetch]: any = useAxiosAuthFunction();

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
        axiosFetch({
          method: "DELETE",
          url: `/users`,
          requestConfig: {
            data: { id: user.id },
          },
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
        axiosFetch({
          method: "PUT",
          url: `/users/change-state`,
          requestConfig: {
            data: { id: user.id },
          },
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
        axiosFetch({
          method: "PUT",
          url: `/users/change-state`,
          requestConfig: {
            data: { id: user.id },
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

  return (
    <tr>
      <td>{rowNumber}</td>
      <td>{user.fullName ? user.fullName : "ندارد"}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber ? user.phoneNumber : "ندارد"}</td>
      <td>{user_created_at}</td>
      <td className={styles.change_user_td}>
        {user.state === 1 && (
          <FontAwesomeIcon icon={faBan} onClick={handleBanUser} />
        )}
        {user.state !== 1 && (
          <FontAwesomeIcon icon={faUserCheck} onClick={handleUnbanUser} />
        )}
        <FontAwesomeIcon icon={faTrash} onClick={handleDeleteUser} />
      </td>
    </tr>
  );
};

export default MUserTRow;
