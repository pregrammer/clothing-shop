import styles from "../styles/management.module.scss";

const ProductFeatureInput = () => {
  return (
    <div className={styles.feature_container}>
      <div>
        <span>عنوان:</span>
        <input
          type="text"
          className="featureSubject"
          placeholder="عنوان ویژگی را وارد کنید"
        />
      </div>
      <div>
        <span>ویژگی:</span>
        <input
          type="text"
          className="featureText"
          placeholder="متن ویژگی را وارد کنید"
        />
        <span className={styles.badge}>-</span>
      </div>
    </div>
  );
};

export default ProductFeatureInput;
