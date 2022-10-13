import styles from "../styles/management.module.scss";

interface Prop {
  id: string;
  handleDeleteInventory: (id: string) => void;
  inputValue?: { size: string; inventory: number };
}

const ProductInventoryInput = ({
  id,
  handleDeleteInventory,
  inputValue,
}: Prop) => {
  return (
    <div className={styles.feature_container}>
      <div>
        <span>سایز:</span>
        <input
          type="text"
          defaultValue={inputValue ? inputValue.size : ""}
          required
          className="product_size_input"
          placeholder="اندازه ی سایز را وارد کنید"
        />
      </div>
      <div>
        <span>موجودی:</span>
        <input
          type="number"
          defaultValue={inputValue ? inputValue.inventory : ""}
          required
          className="product_inventory_input"
          placeholder="موجودی مربوط به سایز را وارد کنید"
        />
        <span
          className={styles.badge}
          onClick={() => {
            handleDeleteInventory(id);
          }}
        >
          -
        </span>
      </div>
    </div>
  );
};

export default ProductInventoryInput;
