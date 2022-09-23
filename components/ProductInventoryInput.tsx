import styles from "../styles/management.module.scss";

const ProductInventoryInput = () => {
  return (
    <div className={styles.feature_container}>
      <div>
        <span>سایز:</span>
        <input
          type="number"
          className="productSize"
          placeholder="اندازه ی سایز را وارد کنید"
        />
      </div>
      <div>
        <span>موجودی:</span>
        <input
          type="number"
          className="productInventory"
          placeholder="موجودی مربوط به سایز را وارد کنید"
        />
        <span className={styles.badge}>-</span>
      </div>
    </div>
  );
};

export default ProductInventoryInput;
