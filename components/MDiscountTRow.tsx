import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/management.module.scss";
import Swal from "sweetalert2";
import useAxiosAuthFunction from "../helpers/useAxiosAuthFunction";
import { useEffect } from "react";

interface DiscountCode {
  id: number;
  title: string;
  percent: string;
}

interface Prop {
  discountCode: DiscountCode;
  rowNumber: number;
  handleRefreshDiscountTable: () => void;
}

const MDiscountTRow = ({
  discountCode,
  rowNumber,
  handleRefreshDiscountTable,
}: Prop) => {
  
  const [data, axiosFetch]: any = useAxiosAuthFunction();

  const handleDeleteDiscount = () => {
    Swal.fire({
      title: "آیا از حذف این کد تخفیف مطمعن هستید؟",
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
          url: `/discount-codes`,
          requestConfig: {
            data: { id: discountCode.id },
          },
        });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      handleRefreshDiscountTable();
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
      <td>{discountCode.title}</td>
      <td>
        {/%/.test(discountCode.percent)
          ? discountCode.percent
          : `${discountCode.percent} تومان`}
      </td>
      <td className={styles.change_user_td}>
        <FontAwesomeIcon icon={faTrash} onClick={handleDeleteDiscount} />
      </td>
    </tr>
  );
};

export default MDiscountTRow;
