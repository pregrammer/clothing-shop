import { useRouter } from "next/router";
import styles from "../styles/products.module.scss";

const ProductsFilter = () => {
  const router = useRouter();

  const inputCheck = (kind: string): boolean => {
    const kinds = router.query.kinds;
    if (Array.isArray(kinds)) {
      if (kinds.includes(kind)) {
        return true;
      }
    } else {
      if (kinds === kind) {
        return true;
      }
    }
    return false;
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    let kinds = router.query.kinds;

    if (e.currentTarget.checked) {
      if (Array.isArray(kinds)) {
        kinds.push(e.currentTarget.value);
      } else if (kinds === undefined) {
        kinds = e.currentTarget.value;
      } else {
        kinds = [kinds, e.currentTarget.value];
      }
    } else {
      if (Array.isArray(kinds)) {
        kinds = kinds.filter((k) => k !== e.currentTarget.value);
      } else {
        kinds = [];
      }
    }

    router.push({
      pathname: "/products",
      query: { page: router.query.page ? router.query.page : 1, kinds },
    });
  };
  return (
    <fieldset>
      <legend>دسته بندی</legend>
      <div className={styles.form_control}>
        <input
          type="checkbox"
          value="clothes"
          id="clothes"
          onChange={handleInputChange}
          checked={inputCheck("clothes")}
        />
        <label htmlFor="clothes">لباس</label>
      </div>
      <div className={styles.form_control}>
        <input
          type="checkbox"
          value="pants"
          id="pants"
          onChange={handleInputChange}
          checked={inputCheck("pants")}
        />
        <label htmlFor="pants">شلوار</label>
      </div>
      <div className={styles.form_control}>
        <input
          type="checkbox"
          value="shoes"
          id="shoes"
          onChange={handleInputChange}
          checked={inputCheck("shoes")}
        />
        <label htmlFor="shoes">کفش</label>
      </div>
      <div className={styles.form_control}>
        <input
          type="checkbox"
          value="men_accessory"
          id="men_accessory"
          onChange={handleInputChange}
          checked={inputCheck("men_accessory")}
        />
        <label htmlFor="men_accessory">اکسسوری مردانه</label>
      </div>
      <div className={styles.form_control}>
        <input
          type="checkbox"
          value="women_accessory"
          id="women_accessory"
          onChange={handleInputChange}
          checked={inputCheck("women_accessory")}
        />
        <label htmlFor="women_accessory">اکسسوری زنانه</label>
      </div>
    </fieldset>
  );
};

export default ProductsFilter;
