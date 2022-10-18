import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PaymentPostKinds from "../../components/PaymentPostKinds";
import PaymentPurchaseInfo from "../../components/PaymentPurchaseInfo";
import PaymentSubmitDiscount from "../../components/PaymentSubmitDiscount";
import PaymentUserInfo from "../../components/PaymentUserInfo";
import useAxiosAuthFunction from "../../helpers/useAxiosAuthFunction";
import useAxiosFunction from "../../helpers/useAxiosFunction";
import styles from "../../styles/payment.module.scss";

interface CartProduct {
  product_id: number;
  inventory_id: number;
  count: number;
}

interface Product {
  id: number;
  name: string;
  discount: string;
  count: number;
  inventory_id: number;
  price: string;
}

interface TotallPriceInfo {
  totallPrice: number;
  discountCode: null | string;
  discountPrice: number;
}

const Payment: NextPage = () => {
  const router = useRouter();
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [totallPriceInfo, setTotallPriceInfo] = useState<TotallPriceInfo>({
    totallPrice: 0,
    discountCode: null,
    discountPrice: 0,
  });
  const [postInfo, setPostInfo] = useState({
    price: 0,
    kind: "",
  });
  const [userData, axiosFetch]: any = useAxiosAuthFunction();
  const [purchaseData, axiosFetch2]: any = useAxiosAuthFunction();
  const [postData, axiosFetch3]: any = useAxiosFunction();
  const [discountData, axiosFetch4]: any = useAxiosFunction();
  const [submitPaymentData, axiosFetch5]: any = useAxiosAuthFunction();

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      axiosFetch({
        method: "GET",
        url: "/users/user",
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      // check profile is completed.
      if (userData.user.firstName) {
        const cart = localStorage.getItem("cart");
        if (cart) {
          const cartArray: CartProduct[] = JSON.parse(cart);
          const ids = cartArray.map((p) => p.product_id);
          axiosFetch2({
            method: "GET",
            url: `/products/cart?payment=active&ids=${JSON.stringify(ids)}`,
          });
        }
      } else {
        router.push("/profile/edit");
        toast.warn("لطفا ابتدا مشخصات خود را تکمیل کنید", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [userData]);

  useEffect(() => {
    if (Object.keys(purchaseData).length !== 0) {
      if (purchaseData.length > 0) {
        // add count and inventory_id fields to products.
        const cart = localStorage.getItem("cart");
        if (cart) {
          const cartArray: CartProduct[] = JSON.parse(cart);
          purchaseData.forEach((pd: Product) => {
            const p = cartArray.filter((ca) => ca.product_id === pd.id)[0];
            pd.count = p.count;
            pd.inventory_id = p.inventory_id;
          });
        }
        // calculate totall price.
        const totallPrice = purchaseData.reduce((tot: number, p: Product) => {
          const priceWithDiscount = /%/.test(p.discount)
            ? Number(p.price) -
              (Number(p.price) * Number(p.discount.replace("%", ""))) / 100
            : Number(p.price) - Number(p.discount);
          return tot + priceWithDiscount * p.count;
        }, 0);
        setTotallPriceInfo((prev) => ({ ...prev, totallPrice }));

        axiosFetch3({
          method: "GET",
          url: "/post-prices",
        });
        setIsCartEmpty(false);
      }
    }
  }, [purchaseData]);

  const handleChangePost = (postAmount: number, kind: string) => {
    setTotallPriceInfo((prev) => ({
      ...prev,
      totallPrice:
        postInfo.price === 0
          ? prev.totallPrice + postAmount
          : prev.totallPrice - postInfo.price + postAmount,
    }));
    setPostInfo({ kind, price: postAmount });
  };

  const handleSubmitDiscount = (discountCode: string) => {
    axiosFetch4({
      method: "GET",
      url: `/discount-codes/check?code=${discountCode}`,
    });
  };
  useEffect(() => {
    if (Object.keys(discountData).length !== 0) {
      const discountPrice = /%/.test(discountData.discountAmount)
        ? (totallPriceInfo.totallPrice *
            Number(discountData.discountAmount.replace("%", ""))) /
          100
        : Number(discountData.discountAmount);
      setTotallPriceInfo((prev) => ({
        totallPrice: prev.totallPrice - discountPrice,
        discountCode: discountData.discountCode,
        discountPrice,
      }));
    }
  }, [discountData]);

  const handlePayClick = () => {
    if (postInfo.kind === "") {
      toast.warn("لطفا نوع پست را مشخص نمایید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const data = {
      totallPrice: totallPriceInfo.totallPrice,
      discountCode: totallPriceInfo.discountCode,
      discountAmount: totallPriceInfo.discountPrice,
      postPrice: postInfo.price,
      postKind: postInfo.kind,
      products: purchaseData,
    };

    axiosFetch5({
      method: "POST",
      url: "/orders",
      requestConfig: {
        data,
      },
    });
  };

  useEffect(() => {
    if (Object.keys(submitPaymentData).length !== 0) {
      localStorage.removeItem("cart");
      router.replace("/profile/orders");
      toast.success(submitPaymentData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [submitPaymentData]);

  return (
    <>
      <Head>
        <title>فروشگاه پوشاک | پرداخت</title>
      </Head>
      <main>
        <div className={styles.content}>
          {isCartEmpty && (
            <p className={styles.empty_basket}>سبد خرید شما خالی می باشد.</p>
          )}
          {!isCartEmpty && (
            <>
              <div className={styles.header}>
                <h1>اطلاعات خرید:</h1>
              </div>
              <div className={styles.fieldsets}>
                <PaymentUserInfo user={userData.user} />
                <PaymentPostKinds
                  handleChangePost={handleChangePost}
                  postKinds={postData}
                />
                <PaymentSubmitDiscount
                  handleSubmitDiscount={handleSubmitDiscount}
                  discountUsed={totallPriceInfo.discountCode}
                />
                <PaymentPurchaseInfo
                  products={purchaseData}
                  totallPriceInfo={totallPriceInfo}
                  postPrice={postInfo.price}
                />
              </div>
              <div className={styles.pay_button}>
                {totallPriceInfo.totallPrice > 0 && (
                  <button onClick={handlePayClick}>پرداخت</button>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Payment;
