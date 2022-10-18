import { FormEvent, useEffect, useRef } from "react";

interface Prop {
  handleSubmitDiscount: (discountCode: string) => void;
  discountUsed: null | string;
}

const PaymentSubmitDiscount = ({
  handleSubmitDiscount,
  discountUsed,
}: Prop) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const discountCode = inputRef.current?.value;
    if (discountCode) {
      handleSubmitDiscount(discountCode);
    }
  };

  useEffect(() => {
    if (discountUsed && inputRef.current) {
      inputRef.current.value = discountUsed;
    }
  }, []);

  return (
    <fieldset>
      <legend>اعمال کد تخفیف</legend>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          style={discountUsed ? { backgroundColor: "rgb(206, 205, 205)" } : {}}
          disabled={discountUsed ? true : false}
          type="text"
          placeholder="لطفا کد تخفیف خود را وارد کنید"
        />
        {!discountUsed && <button>ثبت</button>}
        {discountUsed && <span>ثبت شد!</span>}
      </form>
    </fieldset>
  );
};

export default PaymentSubmitDiscount;
