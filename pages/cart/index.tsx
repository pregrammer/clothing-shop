import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartRow from "../../components/CartRow";
import useAxiosFunction from "../../helpers/useAxiosFunction";
import styles from "../../styles/cart.module.scss";

interface CartProduct {
  product_id: number;
  inventory_id: number;
  count: number;
}

interface Product {
  id: number;
  name: string;
  price: string;
  discount: string;
  product_inventory: { id: number; size: string; inventory: number };
}

interface NewData extends Product {
  count: number;
}

const Cart: NextPage = () => {
  const [data, axiosFetch]: any = useAxiosFunction();
  const [content, setContent] = useState<JSX.Element>();
  const [refrshCart, setRefrshCart] = useState(false);

  const handleRefreshCart = () => {
    setRefrshCart((prev) => !prev);
  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartArray: CartProduct[] = JSON.parse(cart);
      const ids = cartArray.map((p) => ({
        product_id: p.product_id,
        inventory_id: p.inventory_id,
      }));
      axiosFetch({
        method: "GET",
        url: `/products/cart?ids=${JSON.stringify(ids)}`,
      });
    } else {
      setContent(
        <p className={styles.empty_basket}>سبد خرید شما خالی می باشد.</p>
      );
    }
  }, []);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      // delete products from cart which have deleted by manager after user added to cart.
      const newData: NewData[] = [];
      if (data.length !== 0) {
        const cart = localStorage.getItem("cart");
        if (cart) {
          const cartArray: CartProduct[] = JSON.parse(cart);
          const newCartArray: CartProduct[] = [];
          cartArray.forEach((prod) => {
            if (data.some((p: Product) => p.id === prod.product_id)) {
              data.forEach((d: Product) => {
                if (d.id === prod.product_id) {
                  newData.push({
                    ...d,
                    count: prod.count,
                  });
                }
              });
              newCartArray.push(prod);
            }
          });
          localStorage.setItem("cart", JSON.stringify(newCartArray));
        }
      } else {
        localStorage.removeItem("cart");
      }

      const cart = localStorage.getItem("cart");
      if (cart) {
        setContent(
          <>
            <div className={styles.header}>
              <h1>لیست محصولات:</h1>
            </div>
            <div className={styles.content}>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>نام محصول</th>
                    <th>تعداد</th>
                    <th>قیمت واحد</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {newData.map((newProduct, i: number) => (
                    <CartRow
                      key={newProduct.id}
                      rowNumber={i}
                      product={newProduct}
                      handleRefreshCart={handleRefreshCart}
                    />
                  ))}
                </tbody>
              </table>
              <div className={styles.continiue}>
                <Link href="/cart/payment">
                  <a>ادامه</a>
                </Link>
              </div>
            </div>
          </>
        );
      } else {
        setContent(
          <p className={styles.empty_basket}>سبد خرید شما خالی می باشد.</p>
        );
      }
    }
  }, [data, refrshCart]);

  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | سبد خرید</title>
      </Head>
      <main className={styles.cart_page}>{content}</main>
    </>
  );
};

export default Cart;
