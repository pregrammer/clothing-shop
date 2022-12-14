import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/management.module.scss";
import { FormEvent, useEffect, useState } from "react";
import ManagementAside from "../../components/ManagementAside";
import ManagementHeader from "../../components/ManagementHeader";
import ManagementPostPriceTable from "../../components/ManagementPostPriceTable";
import ManagementDiscountTable from "../../components/ManagementDiscountTable";
import useAxiosAuthFunction from "../../helpers/useAxiosAuthFunction";
import Swal from "sweetalert2";

const Manage_side_prices: NextPage = () => {
  const [asideIsOpen, setasideIsOpen] = useState(true);
  const [discountCodeInputs, setDiscountCodeInputs] = useState({
    title: "",
    discount: "",
  });
  const [postPriceInputs, setPostPriceInputs] = useState({
    title: "",
    price: "",
  });
  const [discountData, axiosFetchDiscount]: any = useAxiosAuthFunction();
  const [postData, axiosFetchPost]: any = useAxiosAuthFunction();
  const [refreshDiscountTable, setRefreshDiscountTable] = useState(false);
  const [refreshPostTable, setRefreshPostTable] = useState(false);

  const toggleAside = () => {
    setasideIsOpen((prev) => !prev);
  };

  const handleRefreshDiscountTable = () => {
    setRefreshDiscountTable((prev) => !prev);
  };

  const handleRefreshPostTable = () => {
    setRefreshPostTable((prev) => !prev);
  };

  const handleDiscountSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axiosFetchDiscount({
      method: "POST",
      url: "/discount-codes",
      requestConfig: {
        data: {
          title: discountCodeInputs.title,
          discount: discountCodeInputs.discount,
        },
      },
    });
    setDiscountCodeInputs({
      title: "",
      discount: "",
    });
    handleRefreshDiscountTable();
  };

  const handlePostPriceSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axiosFetchPost({
      method: "POST",
      url: "/post-prices",
      requestConfig: {
        data: {
          title: postPriceInputs.title,
          price: postPriceInputs.price,
        },
      },
    });
    setPostPriceInputs({
      title: "",
      price: "",
    });
    handleRefreshPostTable();
  };

  useEffect(() => {
    if (Object.keys(discountData).length !== 0) {
      Swal.fire({
        title: "!?????????? ????",
        icon: "success",
        html: discountData.message,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "????????",
      });
    }
  }, [discountData]);

  useEffect(() => {
    if (Object.keys(postData).length !== 0) {
      Swal.fire({
        title: "!?????????? ????",
        icon: "success",
        html: postData.message,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "????????",
      });
    }
  }, [postData]);

  return (
    <>
      <Head>
        <title>?????????????? ?????????? | ???????????? ???????? ?????? ??????????</title>
      </Head>
      <main className={styles.manage_side_prices}>
        <ManagementHeader toggleAside={toggleAside} />
        <ManagementAside asideIsOpen={asideIsOpen} />
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h2>???????? ???????? ?????? ????:</h2>
          </div>
          <div className={styles.addPostPrice}>
            <form onSubmit={handlePostPriceSubmit}>
              <div>
                <span>??????????:</span>
                <input
                  type="text"
                  required
                  value={postPriceInputs.title}
                  onChange={(e) =>
                    setPostPriceInputs((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <span>????????:</span>
                <input
                  type="text"
                  required
                  value={postPriceInputs.price}
                  onChange={(e) =>
                    setPostPriceInputs((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                />
              </div>
              <button type="submit">???????????? ???????? ??????</button>
            </form>
          </div>
          <div className={styles.contentTable}>
            <ManagementPostPriceTable
              refreshPostTable={refreshPostTable}
              handleRefreshPostTable={handleRefreshPostTable}
            />
          </div>
          <hr />
          <div className={styles.contentHeader}>
            <h2>???????? ???? ?????? ??????????:</h2>
          </div>
          <div className={styles.addPostPrice}>
            <form onSubmit={handleDiscountSubmit}>
              <div>
                <span>??????????:</span>
                <input
                  type="text"
                  required
                  value={discountCodeInputs.title}
                  onChange={(e) =>
                    setDiscountCodeInputs((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <span>???????? / ????????:</span>
                <input
                  type="text"
                  required
                  value={discountCodeInputs.discount}
                  onChange={(e) =>
                    setDiscountCodeInputs((prev) => ({
                      ...prev,
                      percent: e.target.value,
                    }))
                  }
                />
              </div>
              <button type="submit">???????????? ???? ??????????</button>
            </form>
          </div>
          <div className={styles.contentTable}>
            <ManagementDiscountTable
              refreshDiscountTable={refreshDiscountTable}
              handleRefreshDiscountTable={handleRefreshDiscountTable}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Manage_side_prices;
