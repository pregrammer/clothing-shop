import Link from "next/link";
import styles from "../styles/payment.module.scss";

interface Product {
  id: number;
  name: string;
  discount: string;
  count: number;
  inventory_id: number;
  price: string;
}
type Products = Product[];

interface Prop {
  postPrice: number;
  totallPriceInfo: {
    totallPrice: number;
    discountCode: null | string;
    discountPrice: number;
  };
  products: Products;
}

const PaymentPurchaseInfo = ({
  postPrice,
  totallPriceInfo,
  products,
}: Prop) => {
  return (
    <fieldset>
      <legend>مشخصات خرید</legend>
      <div className={styles.purchase_info}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>نام محصول</th>
              <th>تعداد</th>
              <th>قیمت کل</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => {
              const priceWithDiscount = /%/.test(p.discount)
                ? Number(p.price) -
                  (Number(p.price) * Number(p.discount.replace("%", ""))) / 100
                : Number(p.price) - Number(p.discount);
              return (
                <tr key={p.id}>
                  <td>{i + 1}</td>
                  <td>
                    <Link href={`/product/${p.id}`}>
                      <a>{p.name}</a>
                    </Link>
                  </td>
                  <td>{p.count}</td>
                  <td>{priceWithDiscount * p.count} تومان</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>هزینه پست:</td>
              <td>{postPrice} تومان</td>
              <td>کد تخفیف:</td>
              <td>
                {totallPriceInfo.discountCode
                  ? `${totallPriceInfo.discountCode} (${totallPriceInfo.discountPrice} تومان)`
                  : "ندارد"}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>جمع قابل پرداخت:</td>
              <td colSpan={2}>{totallPriceInfo.totallPrice} تومان</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </fieldset>
  );
};

export default PaymentPurchaseInfo;
