import styles from "../styles/management.module.scss";

interface Prop {
  id: string;
  handleDeleteFeature: (id: string) => void;
  inputValue?: { title: string; feature: string };
}

const ProductFeatureInput = ({ id, handleDeleteFeature, inputValue }: Prop) => {
  return (
    <div className={styles.feature_container}>
      <div>
        <span>عنوان:</span>
        <input
          type="text"
          defaultValue={inputValue ? inputValue.title : ""}
          required
          className="product_feature_title_input"
          placeholder="عنوان ویژگی را وارد کنید"
        />
      </div>
      <div>
        <span>ویژگی:</span>
        <input
          type="text"
          defaultValue={inputValue ? inputValue.feature : ""}
          required
          className="product_feature_text_input"
          placeholder="متن ویژگی را وارد کنید"
        />
        <span
          className={styles.badge}
          onClick={() => {
            handleDeleteFeature(id);
          }}
        >
          -
        </span>
      </div>
    </div>
  );
};

export default ProductFeatureInput;
