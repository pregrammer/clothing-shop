import { useState } from "react";
import styles from "../styles/cart.module.scss";

const CartRow = () => {
  const [count, setCount] = useState(1);
  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };
  const decrementCount = () => {
    setCount((prev) => (prev - 1 > 0 ? prev - 1 : prev));
  };
  return (
    <tr>
      <td>1</td>
      <td>پیراهن ورزشی مردانه 1991 اس دبلیو مدل Metallic</td>
      <td className={styles.product_counter}>
        <button onClick={incrementCount}>+</button>
        <span>{count}</span>
        <button onClick={decrementCount}>-</button>
      </td>
      <td>109000 تومان</td>
    </tr>
  );
};

export default CartRow;
