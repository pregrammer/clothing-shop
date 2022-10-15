import styles from "../styles/index.module.scss";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  discount: string;
  kind: string;
  image_url: string;
  in_stock: boolean;
}

interface Prop {
  product: Product;
}

const ProductCart = ({ product }: Prop) => {
  const priceWithDiscount = /%/.test(product.discount)
    ? Number(product.price) -
      (Number(product.price) * Number(product.discount.replace("%", ""))) / 100
    : Number(product.price) - Number(product.discount);
  return (
    <Link href={`product/${product.id}`}>
      <a className={styles.card}>
        <div>
          <img
            src={product.image_url}
            alt={product.name}
            width={300}
            height={250}
          />
        </div>
        <p>{product.name}</p>
        {product.in_stock === false && (
          <div className={styles.not_in_stock}>
            <p>ناموجود</p>
          </div>
        )}
        {product.in_stock === true && (
          <div className={styles.in_stock}>
            <div className={styles.badge}>
              <p>
                {/%/.test(product.discount)
                  ? product.discount
                  : `${product.discount} تومان`}
              </p>
            </div>
            <div className={styles.price_detail}>
              <p className={styles.current_price}>{product.price} تومان</p>
              <del className={styles.last_price}>{priceWithDiscount}</del>
            </div>
          </div>
        )}
      </a>
    </Link>
  );
};

export default ProductCart;
