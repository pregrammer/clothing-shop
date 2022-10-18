import Link from "next/link";
import styles from "../styles/payment.module.scss";

interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  email: string;
  address: string;
}

interface Prop {
  user: User;
}

const PaymentUserInfo = ({ user }: Prop) => {
  return (
    <fieldset>
      <legend>مشخصات کاربری</legend>
      <div className={styles.user_info}>
        <div>
          <b>نام و نام خانوادگی:</b>
          <span>{`${user?.firstName} ${user?.lastName}`}</span>
        </div>
        <div>
          <b>شماره همراه:</b>
          <span>{user?.phoneNumber}</span>
        </div>
        <div>
          <b>کد پستی:</b>
          <span>{user?.postalCode}</span>
        </div>
        <div>
          <b>ایمیل:</b>
          <span>{user?.email}</span>
        </div>
        <div>
          <b>آدرس دقیق:</b>
          <span>{user?.address}</span>
        </div>
        <div>
          <Link href="/profile/edit">
            <a>ویرایش</a>
          </Link>
        </div>
      </div>
    </fieldset>
  );
};

export default PaymentUserInfo;
