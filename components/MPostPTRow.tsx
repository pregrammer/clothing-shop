import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/management.module.scss";
import Swal from "sweetalert2";
import useAxiosAuthFunction from "../helpers/useAxiosAuthFunction";
import { useEffect } from "react";

interface PostPrice {
  id: number;
  title: string;
  price: string;
}

interface Prop {
  postPrice: PostPrice;
  rowNumber: number;
  handleRefreshPostTable: () => void;
}

const MPostPTRow = ({ postPrice, rowNumber, handleRefreshPostTable }: Prop) => {
  const [data, axiosFetch]: any = useAxiosAuthFunction();

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
        axiosFetch({
          method: "DELETE",
          url: `/post-prices`,
          requestConfig: {
            data: { id: postPrice.id },
          },
        });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      handleRefreshPostTable();
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
      <td>{postPrice.title}</td>
      <td>{`${postPrice.price} تومان`}</td>
      <td className={styles.change_user_td}>
        <FontAwesomeIcon icon={faTrash} onClick={handleDeletePostPrice} />
      </td>
    </tr>
  );
};

export default MPostPTRow;
