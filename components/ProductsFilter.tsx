import styles from "../styles/products.module.scss";

const ProductsFilter = () => {
  return (
    <fieldset>
      <legend>دسته بندی</legend>
      <div className={styles.form_control}>
        <input type="checkbox" value="لباس" name="clothes" id="clothes" />
        <label htmlFor="clothes">لباس</label>
      </div>
      <div className={styles.form_control}>
        <input type="checkbox" value="شلوار" name="pants" id="pants" />
        <label htmlFor="pants">شلوار</label>
      </div>
      <div className={styles.form_control}>
        <input type="checkbox" value="کفش" name="shoes" id="shoes" />
        <label htmlFor="shoes">کفش</label>
      </div>
      <div className={styles.form_control}>
        <input
          type="checkbox"
          value="اکسسوری مردانه"
          name="men_accessory"
          id="men_accessory"
        />
        <label htmlFor="men_accessory">اکسسوری مردانه</label>
      </div>
      <div className={styles.form_control}>
        <input
          type="checkbox"
          value="اکسسوری زنانه"
          name="women_accessory"
          id="women_accessory"
        />
        <label htmlFor="women_accessory">اکسسوری زنانه</label>
      </div>
    </fieldset>
  );
};

export default ProductsFilter;
