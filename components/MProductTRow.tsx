import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/management.module.scss";
import Swal from "sweetalert2";
import useAxiosAuthFunction from "../helpers/useAxiosAuthFunction";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Product {
  id: number;
  name: string;
  price: string;
  discount?: string;
  kind: string;
  features: { title: string; feature: string }[];
  inventories: { size: string; inventory: number }[];
}

interface Prop {
  handleProductModal: (editData?: Product) => void;
  product: Product;
  rowNumber: number;
  handleRefreshPage: () => void;
}

const MProductTRow = ({
  handleProductModal,
  product,
  rowNumber,
  handleRefreshPage,
}: Prop) => {
  const [data, axiosFetch]: any = useAxiosAuthFunction();

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
        axiosFetch({
          method: "DELETE",
          url: `/products`,
          requestConfig: {
            data: { id: product.id, name: product.name },
          },
        });
      }
    });
  };

  const handleEditProduct = () => {
    handleProductModal(product);
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
      <td>
        <Link href={`/product/${product.id}`}>
          <a>{product.name}</a>
        </Link>
      </td>
      <td className={styles.inventory_td}>
        <div>
          <b>سایز</b>
          <b>موجودی</b>
        </div>
        {product.inventories.map((inv) => (
          <div key={uuidv4()}>
            <span>{inv.size}</span>
            <span>{inv.inventory}</span>
          </div>
        ))}
      </td>
      <td>{product.price} تومان</td>
      <td className={styles.change_product_td}>
        <FontAwesomeIcon icon={faEdit} onClick={handleEditProduct} />
        <FontAwesomeIcon icon={faTrash} onClick={handleDeleteProduct} />
      </td>
    </tr>
  );
};

export default MProductTRow;

/*
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
*/
