import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/cart.module.scss";

interface Product {
  id: number;
  name: string;
  price: string;
  discount: string;
  product_inventory: { id: number; size: string; inventory: number };
  count: number;
}

interface Prop {
  product: Product;
  rowNumber: number;
  handleRefreshCart: () => void;
}

interface CartProduct {
  product_id: number;
  inventory_id: number;
  count: number;
}

const CartRow = ({ product, rowNumber, handleRefreshCart }: Prop) => {
  const [count, setCount] = useState(product.count);
  const incrementCount = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      const cart = localStorage.getItem("cart");
      if (cart) {
        const newCart = JSON.parse(cart).map((p: CartProduct) => {
          if (p.product_id === product.id) {
            return { ...p, count: newCount };
          }
          return p;
        });
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
      return newCount;
    });
  };
  const decrementCount = () => {
    setCount((prev) => {
      const newCount = prev - 1 > 0 ? prev - 1 : prev;
      const cart = localStorage.getItem("cart");
      if (cart && prev !== 1) {
        const newCart = JSON.parse(cart).map((p: CartProduct) => {
          if (p.product_id === product.id) {
            return { ...p, count: newCount };
          }
          return p;
        });
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
      return newCount;
    });
  };
  const handleDeleteProduct = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const newCart = JSON.parse(cart).filter(
        (p: CartProduct) => p.product_id !== product.id
      );
      if (newCart.length === 0) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
      handleRefreshCart();
    }
  };
  const in_stock = product.product_inventory.inventory > 0 ? true : false;
  const priceWithDiscount = /%/.test(product.discount)
    ? Number(product.price) -
      (Number(product.price) * Number(product.discount.replace("%", ""))) / 100
    : Number(product.price) - Number(product.discount);
  return (
    <tr>
      <td>{rowNumber}</td>
      <td>
        <Link href={`product/${product.id}`}>
          <a>
            {product.name}{" "}
            <small>(سایز: {product.product_inventory.size})</small>
          </a>
        </Link>
      </td>
      <td className={styles.product_counter}>
        <button onClick={incrementCount}>+</button>
        <span>{count}</span>
        <button onClick={decrementCount}>-</button>
      </td>
      {in_stock && (
        <td>{product.discount ? priceWithDiscount : product.price} تومان</td>
      )}
      {!in_stock && <td>ناموجود</td>}
      <td onClick={handleDeleteProduct} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

export default CartRow;
