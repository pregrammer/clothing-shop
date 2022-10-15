import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/product.module.scss";
import ImageGallery from "react-image-gallery";
import axios from "../../api/axios";
import Loader from "../../components/Loader";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface ProductType {
  id: number;
  name: string;
  price: string;
  discount: string;
  kind: string;
  images: [
    {
      image_url: string;
    }
  ];
  features: [
    {
      id: number;
      title: string;
      feature: string;
    }
  ];
  inventories: [
    {
      id: number;
      size: string;
      inventory: number;
    }
  ];
}

interface Prop {
  product: ProductType;
}

interface CartProduct {
  product_id: number;
  inventory_id: number;
  count: number;
}

const Product: NextPage<Prop> = (prop) => {
  if (!prop.product) return <Loader />;

  const router = useRouter();
  const sizeRef = useRef<HTMLSelectElement>(null);

  const images = prop.product.images.map((img) => ({
    original: img.image_url,
    thumbnail: img.image_url,
    originalHeight: 250,
    originalWidth: 350,
    thumbnailHeight: 50,
    thumbnailWidth: 80,
  }));

  const priceWithDiscount = /%/.test(prop.product.discount)
    ? Number(prop.product.price) -
      (Number(prop.product.price) *
        Number(prop.product.discount.replace("%", ""))) /
        100
    : Number(prop.product.price) - Number(prop.product.discount);

  const in_stock = prop.product.inventories.some((inv) => inv.inventory > 0);

  const handleAddToCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartArray = JSON.parse(cart);
      if (
        cartArray.some(
          (cartProduct: CartProduct) =>
            cartProduct.product_id === prop.product.id
        )
      ) {
        toast.warn("این محصول قبلا اضافه شده است", {
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
      const newArray = [
        ...cartArray,
        {
          product_id: prop.product.id,
          inventory_id: sizeRef.current?.value,
          count: 1,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(newArray));
    } else {
      const newArray = [
        {
          product_id: prop.product.id,
          inventory_id: sizeRef.current?.value,
          count: 1,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(newArray));
    }
    router.push("/cart");
    toast.success("با موفقیت به سبد خرید اضافه شد", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <Head>
        <title>{`فروشگاه پوشاک | ${prop.product.name}`}</title>
      </Head>

      <main className={styles.product_page}>
        <div className={styles.product_gallery}>
          <ImageGallery items={images} showNav={false} showPlayButton={false} />
        </div>
        <div className={styles.product_description}>
          <h1>{prop.product.name}</h1>
          <div className={styles.product_features}>
            <b>ویژگی ها:</b>
            <ul>
              {prop.product.features.map((feature) => (
                <li key={feature.id}>
                  {feature.title}: <b>{feature.feature}</b>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.product_sizes}>
            <b>سایز:</b>
            <select ref={sizeRef}>
              {in_stock &&
                prop.product.inventories
                  .sort((a, b) => b.inventory - a.inventory)
                  .map((inventory) => (
                    <option
                      key={inventory.id}
                      value={inventory.id}
                    >{`${inventory.size} - (موجودی: ${inventory.inventory})`}</option>
                  ))}
              {!in_stock && <option>ناموجود</option>}
            </select>
          </div>
        </div>
        <div className={styles.product_purchase}>
          <fieldset>
            <legend>جزئیات قیمت</legend>
            {in_stock && (
              <div className={styles.price_container}>
                {prop.product.discount && (
                  <div>
                    <del>{prop.product.price}</del>
                    <p className={styles.badge}>{prop.product.discount}</p>
                  </div>
                )}
                {prop.product.discount && <p>{priceWithDiscount} تومان</p>}
                {!prop.product.discount && <p>{prop.product.price} تومان</p>}
              </div>
            )}
            <button
              disabled={!in_stock}
              onClick={handleAddToCart}
              style={
                !in_stock
                  ? { backgroundColor: "gray", cursor: "not-allowed" }
                  : {}
              }
            >
              افزودن به سبد
            </button>
            {!in_stock && <p className={styles.not_in_stock}>ناموجود</p>}
          </fieldset>
        </div>
        <div className={styles.product_purchase_mobile}>
          {in_stock && (
            <div className={styles.price_container}>
              {prop.product.discount && (
                <div>
                  <del>{prop.product.price}</del>
                  <p className={styles.badge}>{prop.product.discount}</p>
                </div>
              )}
              {prop.product.discount && <p>{priceWithDiscount} تومان</p>}
              {!prop.product.discount && <p>{prop.product.price} تومان</p>}
            </div>
          )}
          <button
            disabled={!in_stock}
            onClick={handleAddToCart}
            style={
              !in_stock
                ? { backgroundColor: "gray", cursor: "not-allowed" }
                : {}
            }
          >
            افزودن به سبد
          </button>
          {!in_stock && <p className={styles.not_in_stock}>ناموجود</p>}
        </div>
      </main>
    </>
  );
};

export default Product;

export const getStaticPaths = async () => {
  const res = await axios.get("/products/ids");
  const ids: number[] = res.data;

  const paths = ids.map((id) => ({ params: { id: String(id) } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // Fetch data from external API
    const res = await axios.get(`/products/product/${params?.id}`);
    const product = res.data;

    // Pass data to the page via props with 12 hours expiration time.
    return { props: { product }, revalidate: 60 * 60 * 12 };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
