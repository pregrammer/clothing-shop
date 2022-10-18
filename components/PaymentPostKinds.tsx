import { ChangeEvent, useState } from "react";
import styles from "../styles/payment.module.scss";

interface PostKind {
  id: number;
  title: string;
  price: string;
}
type PostKinds = PostKind[];

interface Prop {
  handleChangePost: (postPrice: number, kind: string) => void;
  postKinds: PostKinds;
}

const PaymentPostKinds = ({ handleChangePost, postKinds }: Prop) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = e.currentTarget.value;
    const kind = e.currentTarget.id;
    handleChangePost(Number(amount), kind);
  };
  return (
    <fieldset>
      <legend>نحوه ی ارسال</legend>
      <div className={styles.post_radios}>
        {postKinds.map((pk) => (
          <div key={pk.id} className={styles.radio_control}>
            <input
              type="radio"
              name="post-kind"
              id={pk.title}
              value={pk.price}
              onChange={handleInputChange}
            />
            <label
              htmlFor={pk.title}
            >{`${pk.title} (${pk.price} تومان)`}</label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default PaymentPostKinds;
